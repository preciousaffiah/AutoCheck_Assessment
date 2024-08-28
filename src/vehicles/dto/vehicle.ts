import { IsNotEmpty, IsString } from "class-validator";


export class RegisterVehicleDto {
    @IsString()
    @IsNotEmpty()
    vin: string

    @IsString()
    @IsNotEmpty()
    make: string

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    year: string;//TODO: gpt
    
    @IsString()
    @IsNotEmpty()
    mileage: string;
}  