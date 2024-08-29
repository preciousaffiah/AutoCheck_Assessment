import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class RegisterLoanDto {
  
  @IsString()
  @IsNotEmpty()
  amount: string;

  
  @IsDateString()
  @IsNotEmpty()
  due_date: string;
}
