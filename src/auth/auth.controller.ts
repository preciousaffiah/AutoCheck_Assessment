import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Res,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorator/public.decorator';
// import { APIResponse } from 'src/shared/response';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  private logger: Logger
  constructor(
    private readonly authService: AuthService,
    // private readonly APIResponse: APIResponse,
  ) {
    this.logger = new Logger(AuthController.name);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() userData: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.authService.create(userData);
      return result;
    } catch (error) {
      this.logger.error('Error registering user:', error);
      throw new InternalServerErrorException('Error registering user');
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() employeeData: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(
        employeeData.email,
        employeeData.password,
      );
      return result;
    } catch (error) {
      this.logger.error('Error logging in:', error);
      throw new InternalServerErrorException('Error logging in');
    }
  }
}