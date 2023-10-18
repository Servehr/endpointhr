/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../../../auth/auth.service";
import { Profile} from "src/models/profile.schema";
import { AuthGuard } from "@nestjs/passport";

@Controller('academic')
export class AcademicController {
    constructor(){}

    @Get('')
    @UseGuards(AuthGuard())
    async bvn(): Promise<string> {
        return 'This is my number';
    }
}
