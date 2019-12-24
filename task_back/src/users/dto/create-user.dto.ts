import { IsEmail, IsNotEmpty, Length, IsEnum } from 'class-validator';

enum IdentificationType {
    CC,
    TI,
    CE,
    RC
}

export class CreateUserDto {
    @IsEnum(IdentificationType)
    @IsNotEmpty()
    readonly identificationType: IdentificationType;

    @IsNotEmpty()
    readonly identification: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @Length(8, 100)
    readonly password: string;

    readonly createdAt: Date;
}