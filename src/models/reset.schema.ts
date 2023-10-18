/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Reset {
    @Prop()
    id: string;
  
    @Prop()
    userId: string;
  
    @Prop()
    hashKey: string;

}

export const ResetSchema = SchemaFactory.createForClass(Reset)
