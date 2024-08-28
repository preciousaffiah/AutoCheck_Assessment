import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {    
    @IsString()
    @IsNotEmpty()
    fname: string

    @IsString()
    @IsNotEmpty()
    lname: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    mobile: string;

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
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}