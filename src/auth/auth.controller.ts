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
import { Public } from 'src/shared/decorator/public.decorator';
import { Response } from 'express';
import { APIResponse } from 'src/shared/response';
import { AuthService } from './auth.service';
import { AdminService } from 'src/admin/admin.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly APIResponse: APIResponse,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() userData: CreateUserDto, @Res() res: Response) {
    const result = await this.authService.create(userData);

    return this.APIResponse.success(
      HttpStatus.CREATED,
      res,
      result,
      'User Registered Successuly',
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginData: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginData);
    return this.APIResponse.success(
      HttpStatus.OK,
      res,
      result,
      'User Loggedin Successuly',
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  async adminLogin(@Body() loginData: LoginDto, @Res() res: Response) {
    const result = await this.adminService.login(loginData);
    return this.APIResponse.success(
      HttpStatus.OK,
      res,
      result,
      'User Loggedin Successuly',
    );
  }
}
