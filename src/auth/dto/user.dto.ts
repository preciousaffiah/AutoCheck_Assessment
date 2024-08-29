import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


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

    
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(10)
    BVN: string;
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

// {
//     "fname": "p",
//     "lname": "l",
//     "email":"p@g.com",
//     "BVN":"1222222222",
//     "password":"123456789",
//     "mobile":"122222"
//     }