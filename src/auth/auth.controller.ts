/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpStatus, Param, Post, Redirect, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticatRequestDto } from "./dto/requests/authenticate.request.dto";
import { OnbaordRequestDto } from "./dto/requests/onboard.request.dto";
import { ChangeRequestDto } from "./dto/requests/change.request.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { ResetRequestDto } from "./dto/requests/reset.request.dto";
import { failed, success } from "./dto/response/query.response.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { UserDecorator } from "./decorator/user.decorator";
import { SkipThrottle, Throttle } from "@nestjs/throttler";

@SkipThrottle()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Throttle({ default: { limit: 5, ttl: 300 } })
    @Post('onboard')
    @UsePipes(ValidationPipe)
    async onboard(@Body() data: OnbaordRequestDto)
    {
        return this.authService.onboard(data)
    }

    @UseGuards(LocalAuthGuard)
    @Post('authenticate')
    async authenticate(@Body() user: AuthenticatRequestDto, @Res({passthrough: true}) res: Response) {
        const auth = await this.authService.authenticate(user);
        const returnedUser = await this.filterAuthData(auth)
        res.send(returnedUser) 
    }

    async filterAuthData(user: any){
        return {
            firstname: user.firstname,
            surname: user.surname,
            email: user.email,
            employeeId: user.employeeId,
            token: user.token,
            role: []
        }
    }

    @Post('reset')
    async reset(@Body() data: ResetRequestDto) {
        return this.authService.reset(data)
    }

    @Post('forgot')
    async fogot(@Body() email: string) {
        return this.authService.forgot(email['email']);
    }

    @Get('verify/:haskKey')
    async verify(@Param('haskKey') haskKey: string) {
        return this.authService.verify(haskKey)
    }

    @UseGuards(AuthGuard())
    @Post('change')
    async change(@Body() data: ChangeRequestDto) {
        return this.authService.change(data);
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response, @Req() req: Request) {
        const validUser = req.cookies['jwt']
        if(validUser)
        {
            console.log('Oya')
            res.clearCookie('jwt')
            return success(200, 'User successfully signed out', '')
        } else {
            console.log('many times')
            return failed(501, 'How many times you wan logout')
        }
    }

    @Post('redirect')
    async redirect(@Res() res){
        // return res.redirect('http://www.google.com');
        const url: string = 'http://www.google.com';
        return window.location.href = url
    }

    @UseGuards(JwtAuthGuard)
    @Get('bvn')
    async profile(@Req() req: Request, @Res() res: Response) {
        res.send({bvn: 'That`s my BVN', user: req.user})
    }

    @UseGuards(JwtAuthGuard)
    @Get('testing')
    async testing(@Req() req: Request, @Res() res: Response, @UserDecorator() x: any) {
        res.send({bvn: 'That`s my BVN', user: req.user, y: x})
    }

    @Get('fetch')
    async fetch() {
        return {msg: "Allah is Great", status: 200}
    }

    @Get()
    async hello() {
        return {msg: "Who are you", status: 200}
    }

}