/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Profile {
    @Prop()
    id: string;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile)
