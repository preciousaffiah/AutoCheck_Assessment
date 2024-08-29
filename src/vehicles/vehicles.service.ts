import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { RegisterVehicleDto } from './dto/vehicle';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class VehicleService {
  private logger: Logger;

  private readonly apiKey = process.env.VINAPIKEY;
  private readonly baseUrl = process.env.VINURL;
  constructor(
    @InjectRepository(Vehicle)
    private readonly VehicleRepository: Repository<Vehicle>,
  ) {
    this.logger = new Logger(VehicleService.name);
  }

  async create(VehicleData: RegisterVehicleDto): Promise<any> {
    try {
      VehicleData.vin = VehicleData.vin.toUpperCase();

      const vehicleExists = await this.VehicleRepository.findOne({
        where: { vin: VehicleData.vin },
      });

      if (vehicleExists) {
        throw new ConflictException('Vehicle already exists');
      }

      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}?vin=${VehicleData.vin}`,
        {
          headers: {
            'X-Api-Key': this.apiKey,
          },
        },
      );

      // Create a new Vehicle instance
      const newVehicle = this.VehicleRepository.create(response.data);

      // Save the new Vehicle to the database
      await this.VehicleRepository.save(newVehicle);

      return newVehicle;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }

      if (error.response) {
        throw new HttpException(
          {
            statusCode: error.response.status,
            message: error.response.data,
            error: true,
          },
          error.response.status,
        );
      } else {
        throw new InternalServerErrorException('Could not register vehicle'); // Catch unexpected errors
      }
    }
  }

  async findAll(limit: number, offset: number): Promise<Vehicle[]> {
    try {
      offset = (offset - 1) * limit;

      const Vehicles = await this.VehicleRepository.find({
        skip: offset,
        take: limit,
      });
      return Vehicles;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not register vehicle'); // Catch unexpected errors
    }
  }

  async findByIdOrVin(id: string, vin: string): Promise<Vehicle> {
    try {
      let Vehicle;

      if (!id && !vin) {
        throw new BadRequestException('Either vin or id must be provided');
      }

      if (id) {
        Vehicle = await this.VehicleRepository.findOne({
          where: { id },
        });
      }

      if (vin) {
        Vehicle = await this.VehicleRepository.findOne({
          where: { vin },
        });
      }

      if (!Vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      return Vehicle;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not register vehicle'); // Catch unexpected errors
    }
  }

  async findByVin(vin: string): Promise<Vehicle> {
    try {
      const Vehicle = await this.VehicleRepository.findOne({
        where: { vin: vin },
      });

      if (!Vehicle) {
        throw new NotFoundException('Vehicle not found');
      }

      return Vehicle;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not register vehicle'); // Catch unexpected errors
    }
  }
}
