import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class RegisterVehicleDto {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(15)
  vin: string;
}