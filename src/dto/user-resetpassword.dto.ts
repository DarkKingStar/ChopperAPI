import { IsEmail, IsNotEmpty } from "class-validator";

export class UserResetPasswordDto {
    @IsNotEmpty()
    readonly oldpassword: string;
    @IsNotEmpty()
    readonly newpassword: string;
}   
