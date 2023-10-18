/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common"
import { Response } from "express"

export const success = (status: number, msg: string, data: any) =>
{
    return { status: 200, msg: msg, data: data }
}

export const failed = (status: number = 400, msg: string) =>
{
    switch(status)
    {
        case 400:
            throw new HttpException(msg, HttpStatus.NOT_FOUND);  
        case 500:
            throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR); 
        case 403:
            throw new HttpException(msg, HttpStatus.FORBIDDEN); 
        case 304:
            throw new HttpException(msg, HttpStatus.NOT_MODIFIED); 
        case 401:
            throw new HttpException(msg, HttpStatus.UNAUTHORIZED); 
        case 100:
            throw new HttpException(msg, HttpStatus.NOT_MODIFIED); 
        case 301:
            throw new HttpException(msg, HttpStatus.NOT_MODIFIED); 
        case 301:
            throw new HttpException(msg, HttpStatus.NOT_MODIFIED); 
    }
}