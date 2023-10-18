/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category {
    @Prop()
    id: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category)
