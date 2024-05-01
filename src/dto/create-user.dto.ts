import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;

    readonly avatar: string;

    @IsNotEmpty()
    readonly created_At: Date;
    @IsNotEmpty()
    readonly updated_At: Date;
}
