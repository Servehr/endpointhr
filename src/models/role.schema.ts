/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Role {
    @Prop()
    id: string;
  
    @Prop()
    firstname: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role)
