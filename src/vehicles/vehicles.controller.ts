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
  Logger,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { APIResponse } from 'src/shared/response';
import { Response } from 'express';
import { RegisterVehicleDto } from './dto/vehicle';
import { Roles } from 'src/shared/decorator/public.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Role } from 'src/enums/role';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly APIResponse: APIResponse,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query('offset') offset: number = 1, @Res() res: Response) {
    const result = await this.vehicleService.findAll(10, offset);
    return this.APIResponse.success(HttpStatus.OK, res, result, '');
  }

  @HttpCode(HttpStatus.OK)
  @Get('find')
  async findByIdOrVin(
    @Res() res: Response,
    @Query('id') id?: string,
    @Query('vin') vin?: string,
  ) {
    const result = await this.vehicleService.findByIdOrVin(id, vin);
    return this.APIResponse.success(HttpStatus.OK, res, result, '');
  }
}
