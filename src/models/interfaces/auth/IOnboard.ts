import { ObjectId } from "mongoose";

export interface IOnboard 
{
    _id: ObjectId | string,
    firstname: string,
    surname: string,
    email: string,
    employeeId: string,
    password: string,
    accounts: []
}