import { IsEmail, IsNotEmpty } from "class-validator";

export class UserPasswordDto {
    @IsNotEmpty()
    readonly password: string;
}
