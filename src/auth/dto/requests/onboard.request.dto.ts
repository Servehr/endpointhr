import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, ValidateNested } from "class-validator";

export class OnbaordRequestDto
{
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    surName: string;

    @IsNotEmpty()
    @IsString()
    employeeId: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    company: string;

    @IsNotEmpty()
    @IsNumber()
    branch: string;

    // @ValidateNested()
    // @Type(() => OnbaordRequestDto)
    // people: string[]

}