import {
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Res,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { APIResponse } from 'src/shared/response';
import { Response } from 'express';
import { RegisterVehicleDto } from './dto/vehicle';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly APIResponse: APIResponse,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body(ValidationPipe) vehicleData: RegisterVehicleDto, @Res() res: Response) {
    try {
      const result = await this.vehicleService.create(vehicleData);
      return this.APIResponse.success(
        HttpStatus.OK,
        result,
        'Registration successful',
      );
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query('offset') offset: number = 1, @Res() res: Response) {
    try {
      const result = await this.vehicleService.findAll(10, offset);
      return this.APIResponse.success(HttpStatus.OK, res, result, '');
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('find')
  async findByIdOrVin(@Res() res: Response, @Query('id') id?: string, @Query('vin') vin?: string) {
    try {
      const result = await this.vehicleService.findByIdOrVin(id, vin);
      return this.APIResponse.success(HttpStatus.OK, res, result, '');
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }
}