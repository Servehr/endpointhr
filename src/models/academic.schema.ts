/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Academic {
    @Prop()
    id: string;
  
    @Prop()
    firstname: string;

}

export const AcademicSchema = SchemaFactory.createForClass(Academic)
