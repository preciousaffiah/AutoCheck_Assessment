import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";


export class CreateAdminDto {
    
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
    password: string;
}

export class UpdateLoanStatusDto {
    @IsString()
    @IsNotEmpty()
    id: string
}