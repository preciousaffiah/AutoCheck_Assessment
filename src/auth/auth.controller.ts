import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Put,
  Param,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployeeDto, LoginDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Public, Roles } from 'src/shared/decorator/public.decorator';
import { UpdateEmployeeDto } from './dto/user.dto';
import { Role } from 'src/enums/role';
import { APIResponse } from 'src/shared/response';
import { Response } from 'express';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('employees')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly APIResponse: APIResponse,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body(ValidationPipe) employeeData: CreateEmployeeDto, @Res() res: Response) {
    try {
      const result = await this.authService.registerEmployee(employeeData);
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

  @HttpCode(HttpStatus.OK)
  @Put('update')
  async update(
    @Request() req,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto, @Res() res: Response
  ) {
    try {
      const result = await this.authService.update(
        req.user.user_id,
        updateEmployeeDto,
      );

      return this.APIResponse.success(HttpStatus.OK, res, result, 'Update successful');
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('admin/update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async adminUserUpdate(
    @Param('id') id: string,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto, @Res() res: Response
  ) {
    try {
      const result = await this.authService.update(id, updateEmployeeDto);
      return this.APIResponse.success(HttpStatus.OK, res, result, 'Update successful');
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }
}