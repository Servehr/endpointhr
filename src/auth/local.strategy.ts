require('dotenv').config();
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { User } from "src/models/auth.schema";
import { jwtConstants } from './constants/jwtConstants';
import { AuthService } from "./auth.service";
import { failed } from "./dto/response/query.response.dto";
import { FoundNotException } from "../common/exceptions/not.found.exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({usernameField: 'employeeId'});
    }

    async validate(employeeId: string, password: string): Promise<any>
    {
        const user = await this.authService.validateUser(employeeId, password)
        if(!user){ throw new FoundNotException('invalid username or password') }
        return user;
    }

}
