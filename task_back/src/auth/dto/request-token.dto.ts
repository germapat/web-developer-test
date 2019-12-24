import { IsNotEmpty, IsEmail } from "class-validator";

export class RequestTokenDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}