import { IsNumber, IsNumberString, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class onBoardResponseDto
{
    // @IsNumberString()
    // id: string;

    // @IsString()
    // employeeId: string;

    // @IsString()
    // firstName: string;

    // @IsString()
    // surname: string;

    // @IsString()
    // token: string;

    // @IsNumber()
    // roles: string;
    
    readonly id: string;
    readonly employeeId: string;
    readonly firstName: string;
    readonly surname: string;
    readonly token: string;
    readonly roles: string;
}