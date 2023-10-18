/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Account {
    @Prop()
    id: string;

}

export const AccountSchema = SchemaFactory.createForClass(Account)
