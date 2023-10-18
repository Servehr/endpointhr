import { HttpException, HttpStatus } from "@nestjs/common";

export class FoundNotException extends HttpException {
     constructor(msg?: string, status?: HttpStatus, data?: any){
        super(msg || 'not found', status || HttpStatus.NOT_FOUND, data || [])
     }
}