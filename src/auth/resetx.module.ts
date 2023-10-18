/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ResetSchema } from "src/models/reset.schema";

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Reset', schema: ResetSchema }]) ],
    controllers: [],
    providers: [],
    exports: []
})

export class ResetxModule {}