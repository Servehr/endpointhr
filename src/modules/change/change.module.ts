/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: '' }])
    ],
    controllers: [],
    providers: [],
    exports: []
})

export class ChangeModule {}