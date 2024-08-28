import { Module } from '@nestjs/common';
import { LoanService } from './loans.service';
import { LoanController } from './loans.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { APIResponse } from 'src/shared/response';
import { Loan } from './entities/loan.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ ConfigModule, TypeOrmModule.forFeature([Loan])],
  controllers: [LoanController],
  providers: [
    LoanService,
    APIResponse,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [LoanService],
})
export class LoanModule {}
