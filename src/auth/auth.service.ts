/* eslint-disable prettier/prettier */
import { Get, HttpException, HttpStatus, Injectable, Redirect, Res, Response, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs"
import { User } from "../models/auth.schema"
import { Model } from "mongoose";
import { EmailService } from "src/mail/email.service";
import { OnbaordRequestDto } from "./dto/requests/onboard.request.dto";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwtConstants";
import { Reset } from "src/models/reset.schema";
import { RandomString } from "src/common/helpers/text.helper";
import { ChangeRequestDto } from "./dto/requests/change.request.dto";
import { ResetRequestDto } from "./dto/requests/reset.request.dto";
import { failed, success } from "./dto/response/query.response.dto";

const saltOrRounds = 10;


@Injectable()
export class AuthService {
        
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Reset.name) private readonly resetModel: Model<Reset>,
                                private emailService: EmailService,
                                private jwtService: JwtService
                                ) {}
                                
    async validateUser(employeeId: string, password: string): Promise<any>{
        const user = await this.userModel.findOne({employeeId})
        if(user)
        {
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch) { return user } else { return null }
        }
        return null
    }

    async verifyUser(employeeId: string, password:string): Promise<any>{
        const user = await this.userModel.findOne({employeeId: employeeId})
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch) { return user } else { return null }
    }

    async onboard(user: OnbaordRequestDto): Promise<{} | void>
    {
        const pswd: string = '12345ABCD'
        const encryptedPassword = await bcrypt.hash(pswd, 10)
        Object.assign(user, {password: encryptedPassword});
        const newEmployee: any = await this.userModel.create(user);
        if(newEmployee?._id != null)
        {
            const password: string = "12345ABCD";
            const url:string = 'https://www.hrcore.ng/outsourcing'
            this.emailService.welcome(newEmployee, password, 'welcome', url)     
            const returnedUser = await this.filterSignUpData(newEmployee)
            return success(200, "User created, detail sent to mail", returnedUser)
        } 
        return failed(500, 'Oops, operation aborted')
    }

    async filterSignUpData(user: any){
        return {
            firstname: user.firstname,
            surname: user.surname,
            email: user.email,
            employeeId: user.employeeId
        }
    }

    async authenticate(user: any): Promise<{} | void | boolean> 
    {
        const { employeeId, password } = user
        const userExist: any = await this.userModel.findOne({employeeId: employeeId}); 
        if(userExist){ 
            const isMatch = await bcrypt.compare(password, userExist.password)
            if(!isMatch){ return failed(403, 'Invalid employeeId or password') }
            const payload = userExist._id 
            
            const identity = this.jwtService.sign({ payload: payload, employeeId: user.employeeId, password: user.password }); 
            await this.userModel.updateOne({ _id: userExist._id }, { $set: { identity: identity } } )
            Object.assign(userExist, {token: identity});
            return userExist
        }
        return failed(403, 'Invalid employeeId or password') 
    }

    async change(data: ChangeRequestDto): Promise<{} | void>
    { 
        const { _id, currentPassword, newPassword, confirmPassword } = data
        const userExist: any = await this.userModel.findOne({_id: _id});
        // return { status: 200, msg: userExist }
        // return userExist.doesPasswordMatch(currentPassword);
        if(userExist)
        {
            const isMatch = await bcrypt.compare(currentPassword, userExist.password)
            // if(!userExist.doesPasswordMatch(password)){ return failed(401, 'Invalid employeeId or password') }
            if(!isMatch){ return failed(401, 'Invalid employeeId or password') }
            if(newPassword === confirmPassword)
            { 
                const password = await bcrypt.hash(newPassword, 10)
                const updatedUser = await this.userModel.updateOne({ _id: _id }, { $set: { password: password } } )
                return success(200, "Password successfully changed", "")
            }
            return { status: 200, msg: "Changing password failed" }
        } else {
            failed(403, 'You probably not the owner of the account')
        }
    }

    async reset(data: ResetRequestDto): Promise<{} | void>
    {
        const { _id, newPassword, confirmPassword } = data
        if(newPassword === confirmPassword)
        { 
            const password = await bcrypt.hash(newPassword, 10)
            await this.userModel.updateOne({ _id: _id }, { $set: { password: password } } )
            return success(200, "Password successfully changed", "")
        }
        return { status: 200, msg: "Password do not match" }
    }

    async forgot(email: string): Promise<{} | void>
    {
        const user: any = await this.userModel.findOne({email})
        if(user)
        {    
            const verificationCode: string = RandomString(6)
            const hashKey: string = RandomString(30)
            console.log(verificationCode)
            const url:string = `auth/verify/${hashKey}`
            const resetRequest = await this.resetModel.create({userId: user._id, hashKey: hashKey});
            if(resetRequest){ 
                this.emailService.forgotPassword(user, verificationCode, 'forgot', url) 
                return success(200, "Account verification confirmed, <br/>Click on the verification link and enter code to complete verification", 'https://hrcore.ng')
            }
            return failed(500, 'Internal Server Error')
        } else {    
            return failed(400, 'Account user email does not exist')     
        }
    }

    async verify(hashKey: string): Promise<{} | void>
    {
        const user: any = await this.resetModel.findOne({hashKey: hashKey}) 
        if(user)
        {    
            const deleted = await this.resetModel.findByIdAndRemove(user._id)
            if(deleted)
            {
                return success(200, "Account verification confirmed", 'https://hrcore.ng/change-pswd')
            }
            return failed(301, 'Account Verification Incomplet, but user can proceed to his/her account')
        } else { 
            return { status: 301, msg: 'Account Aleady verified' }
            // return failed(301, 'Account Verification Failed')  
        }
    }

    async logout(): Promise<any>
    {
        this.jwtService.sign({ payload: null, secret: null, expiresIn: -1 }); 
        return { status: 200, msg: 'User successfully logged out' };
    }

    getAll()
    {
        // return this.userModel.map((user) => plainToClass(serializeUser, array of user))
    }

}