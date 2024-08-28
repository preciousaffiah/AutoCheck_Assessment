import { Module } from '@nestjs/common';
import { LoanService } from './loans.service';
import { LoanController } from './loans.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { APIResponse } from 'src/shared/response';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, ConfigModule, TypeOrmModule.forFeature([Loan])],
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
