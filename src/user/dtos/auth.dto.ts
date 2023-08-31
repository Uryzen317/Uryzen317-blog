import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @MinLength(4)
    @MaxLength(64)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(64)
    @IsNotEmpty()
    password: string;
}