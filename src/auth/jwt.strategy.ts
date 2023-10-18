require('dotenv').config();
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { User } from "../models/auth.schema";
import { jwtConstants } from './constants/jwtConstants';
import { AuthService } from "./auth.service";
import { failed } from "./dto/response/query.response.dto";
import { UserDecorator } from "./decorator/user.decorator";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{
    constructor(private authService: AuthService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secretOrKey,
            signOptions: { expiresIn: jwtConstants.JWT_EXPIRES },
            ignoreExpiration: false
	    });
    }

    async validate(payload: any): Promise<any>
    {
        const userExist = await this.authService.verifyUser(payload.employeeId, payload.password);  
        if(!userExist){ return failed(301, 'User Unathorized') }
        return userExist;
    }

}
