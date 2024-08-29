import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../shared/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { APIResponse } from 'src/shared/response';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Loan } from 'src/loan/entities/loan.entity';
import { LoanModule } from 'src/loan/loans.module';
import { VehicleModule } from 'src/vehicles/vehicles.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule,
    LoanModule,
    VehicleModule,
    TypeOrmModule.forFeature([Admin, Loan]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your_secret_key',  // Use your secret key
      signOptions: { expiresIn: '1d' },  // Token expiration
    }),
  ],
  providers: [
    AdminService,
    SeederService,
    APIResponse,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule { }
