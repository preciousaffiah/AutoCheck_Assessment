import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @ApiProperty({ default: "John" })
    @IsString()
    @IsNotEmpty()
    fname: string

    @ApiProperty({ default: "Doe" })
    @IsString()
    @IsNotEmpty()
    lname: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mobile: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(['REGULAR', 'ADMIN'], {
        message: "Valid role required"
    })
    role: 'REGULAR' | 'ADMIN';
}

export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}