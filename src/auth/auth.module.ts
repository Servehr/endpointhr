/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from './auth.controller'
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "src/models/auth.schema";
import { EmailModule } from "src/mail/email.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { jwtConstants } from "./constants/jwtConstants";
import { ResetSchema } from "src/models/reset.schema";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            return {
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                        expiresIn: configService.get<string>('JWT_EXPIRES')
                },
            };
          },
          inject: [ConfigService]
        }),
        ConfigModule, EmailModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Reset', schema: ResetSchema }])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
    exports: [AuthService, JwtStrategy, JwtModule, PassportModule]


    // imports: [
    //     PassportModule.register({defaultStrategy: 'jwt' }),
    //     JwtModule.register({
    //         secret: jwtConstants.SECRET,
    //         signOptions: {
    //             expiresIn: '3600s'
    //         }
    //     }),
    //     EmailModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // ],
    // controllers: [AuthController],
    // providers: [AuthService, LocalStrategy, JwtStrategy],
    // exports: [AuthService, PassportModule, JwtModule]
})

export class AuthModule {}