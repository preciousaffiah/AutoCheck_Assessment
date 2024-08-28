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
import { LoanService } from './loans.service';
import { APIResponse } from 'src/shared/response';
import { Response } from 'express';
import { RegisterLoanDto } from './dto/loan';

@Controller('vehicle')
export class LoanController {
  constructor(
    private readonly loanService: LoanService,
    private readonly APIResponse: APIResponse,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register') 
  async register(@Body(ValidationPipe) loanData: RegisterLoanDto, @Res() res: Response) {
    try { //pass user_id to service
      const result = await this.loanService.create(loanData);
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
      const result = await this.loanService.findAll(10, offset);
      return this.APIResponse.success(HttpStatus.OK, res, result, '');
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(@Query('id') id: string, @Res() res: Response) {
    try {
      const result = await this.loanService.findById(id);
      return this.APIResponse.success(HttpStatus.OK, res, result, '');
    } catch (error) {
      return this.APIResponse.error(error, res);
    }
  }
}