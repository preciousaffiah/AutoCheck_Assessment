import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorator/public.decorator';
import { APIResponse } from 'src/shared/response';
import { Response } from 'express';

@Controller('employees')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly APIResponse: APIResponse,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body(ValidationPipe) userData: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.authService.create(userData);
      return this.APIResponse.success(
        HttpStatus.OK,
        result,
        'Registration successful',
      );
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body(ValidationPipe) employeeData: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(
        employeeData.email,
        employeeData.password,
      );
      return this.APIResponse.success(HttpStatus.OK, res, result, 'Login successful');
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }
}