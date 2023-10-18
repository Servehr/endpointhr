/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from "bcryptjs"
import { Account } from './account.schema';
import { Role } from './role.schema';
import { Category } from './category.schema';

@Schema({ timestamps: true })
export class User {
    
    @Prop()
    id: string;
  
    @Prop({ required: true })
    firstName: string;
  
    @Prop({ required: true })
    surName: string;

    @Prop()
    otherName: string;

    @Prop()
    phone: string;

    @Prop()
    dob: Date;

    @Prop()
    gender: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    employeeId: string;

    @Prop()
    firstTimer: boolean;

    @Prop()
    online: boolean;

    @Prop()
    passport: string;

    @Prop()
    token: string;

    @Prop()
    password: string;

    @Prop()
    onBoardedBy: string;

    @Prop()
    identity: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    categoryId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
    roleId: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Account.name }] })
    accounts: Account[];
}

export const UserSchema = SchemaFactory.createForClass(User)

// UserSchema.pre('save', async function(next) 
// {
//     try {
//         if (this.password && this.isModified('password')) {
//           this.password = await bcrypt.hash(this.password, 10);
//         }
//         next();
//       } catch (err) {
//         next(err);
//       }
      
//   });

// UserSchema.methods.doesPasswordMatch = async function(userPswd: string) 
// {
//     const user: any = this
//     return await bcrypt.compare(userPswd, user.password)
// }





