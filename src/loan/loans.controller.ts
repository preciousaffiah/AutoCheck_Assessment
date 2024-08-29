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
  Request,
} from '@nestjs/common';
import { LoanService } from './loans.service';
import { APIResponse } from 'src/shared/response';
import { Response } from 'express';
import { RegisterLoanDto } from './dto/loan';

@Controller('loan')
export class LoanController {
  constructor(
    private readonly loanService: LoanService,
    private readonly APIResponse: APIResponse,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('request')
  async register(
    @Body(ValidationPipe) loanData: RegisterLoanDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const result = await this.loanService.create(loanData, req.user.user_id);
    return this.APIResponse.success(
      HttpStatus.CREATED,
      res,
      result,
      'Loan request successful',
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findById(
    @Query('id') id: string,
    @Request() req,
    @Res() res: Response,
  ) {
    const result = await this.loanService.findUserLoanById(id, req.user.user_id);
    return this.APIResponse.success(HttpStatus.OK, res, result, '');
  }

  @HttpCode(HttpStatus.OK)
  @Get('/user/history')
  async findByUserId(
    @Query('offset') offset: number = 1,
    @Request() req,
    @Res() res: Response,
  ) {
    const result = await this.loanService.findByUserId(
      req.user.user_id,
      10,
      offset,
    );
    return this.APIResponse.success(HttpStatus.OK, res, result, 'Loan history');
  }
}
