import { NestMiddleware } from "@nestjs/common";

export class ValidatueUserMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log('User Undergoing Validation')
        next()
    }

}