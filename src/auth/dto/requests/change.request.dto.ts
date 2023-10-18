/* eslint-disable prettier/prettier */
export class ChangeRequestDto  
{
    readonly _id: string;
    readonly currentPassword: string;
    readonly newPassword: string;
    readonly confirmPassword: string;
}