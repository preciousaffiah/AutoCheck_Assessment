import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Query,
  Get,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Public, Roles } from 'src/shared/decorator/public.decorator';
import { Response } from 'express';
import { APIResponse } from 'src/shared/response';
import { CreateAdminDto, UpdateLoanStatusDto } from './dto/admin.dto';
import { AdminService } from './admin.service';
import { LoanService } from 'src/loan/loans.service';
import { RegisterVehicleDto } from 'src/vehicles/dto/vehicle';
import { VehicleService } from 'src/vehicles/vehicles.service';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Role } from 'src/enums/role';

@UseGuards(RolesGuard) // Apply the RolesGuard to the entire controller
@Roles(Role.ADMIN) // Restrict all routes in this controller to ADMIN role
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly loanService: LoanService,
    private readonly vehicleService: VehicleService,
    private readonly APIResponse: APIResponse,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('loan')
  async findAll(@Query('offset') offset: number = 1, @Res() res: Response) {
    const result = await this.loanService.findAll(10, offset);
    return this.APIResponse.success(HttpStatus.OK, res, result, 'loan requests');
  }

  @HttpCode(HttpStatus.OK)
  @Put('loan/approve')
  async approveLoanStatus(
    @Body() userData: UpdateLoanStatusDto,
    @Res() res: Response,
  ) {
    const result = await this.adminService.approveLoanStatus(userData);

    return this.APIResponse.success(
      HttpStatus.OK,
      res,
      null,
      'Loan approved Successuly',
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Put('loan/decline')
  async declineLoanStatus(
    @Body() userData: UpdateLoanStatusDto,
    @Res() res: Response,
  ) {
    const result = await this.adminService.declineLoanStatus(userData);

    return this.APIResponse.success(
      HttpStatus.OK,
      res,
      null,
      'Loan declined Successuly',
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('loan/:id')
  async findById(@Query('id') id: string, @Res() res: Response) {
    const result = await this.loanService.findById(id);
    return this.APIResponse.success(HttpStatus.OK, res, result, '');
  }


  @HttpCode(HttpStatus.CREATED)
  @Post('vehicle/register')
  async registerVehicle(
    @Body() vehicleData: RegisterVehicleDto,
    @Res() res: Response,
  ) {
    const result = await this.vehicleService.create(vehicleData);
    return this.APIResponse.success(
      HttpStatus.CREATED,
      res,
      result,
      'Vehicle Registration successful',
    );
  }
}
