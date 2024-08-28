import { Module } from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { VehicleController } from './vehicles.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { APIResponse } from 'src/shared/response';
import { Vehicle } from './entities/vehicle.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    APIResponse,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [VehicleService],
})
export class VehicleModule {}
