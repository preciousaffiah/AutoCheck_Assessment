import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vehicle } from "./entities/vehicle.entity";
import { Repository } from "typeorm";
import { APIResponse } from "src/shared/response";

// TODO: rewrite comments

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly VehicleRepository: Repository<Vehicle>,
    private readonly APIResponse: APIResponse
  ) {}

  /**
   * Create a new Vehicle.
   * @param VehicleData - The data of the Vehicle to create.
   * @returns A Promise that resolves to the created Vehicle entity.
   * @throws ConflictException if there's an error saving the Vehicle.
   */
  async create(VehicleData: any): Promise<any> {
    // Create a new Vehicle instance
    const newVehicle = this.VehicleRepository.create(VehicleData);

    try {
      // Save the new Vehicle to the database
      await this.VehicleRepository.save(newVehicle);
    } catch (error) {
      this.APIResponse.ExceptionError(error);
    }

    return newVehicle;
  }

  /**
   * Find all Vehicles with pagination.
   * @param limit - The maximum number of Vehicles to retrieve.
   * @param offset - The number of Vehicles to skip.
   * @returns A Promise that resolves to an array of Vehicle entities.
   */
  async findAll(limit: number, offset: number): Promise<Vehicle[]> {
    try {
      const Vehicles = await this.VehicleRepository.find({
        skip: offset,
        take: limit,
      });
      return Vehicles;
    } catch (error) {
      // Handle the error appropriately
      this.APIResponse.ExceptionError(error);
    }
  }

  /**
   * Find a Vehicle by their ID.
   * @param id - The ID of the Vehicle to find.
   * @returns A Promise that resolves to the found Vehicle entity.
   * @throws NotFoundException if the Vehicle with the given ID is not found.
   */
  async findByIdOrVin(id: string, vin: string): Promise<Vehicle> {
    try {
      let Vehicle;

      if(!id && !vin){
        throw new BadRequestException("Either vin or id must be provided");
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
        throw new NotFoundException("Vehicle not found");
      }
      return Vehicle;
    } catch (error) {
      // Handle the error appropriately
      this.APIResponse.ExceptionError(error);
    }
  }

  /**
   * Find a Vehicle by their email.
   * @param email - The email of the Vehicle to find.
   * @returns A Promise that resolves to the found Vehicle entity.
   * @throws NotFoundException if the Vehicle with the given email is not found.
   */
  async findByVin(vin: string): Promise<Vehicle> {
    try {
      const Vehicle = await this.VehicleRepository.findOne({
        where: { vin: vin },
      });

      if (!Vehicle) {
        throw new NotFoundException("Vehicle not found");
      }

      return Vehicle;
    } catch (error) {
      // Handle the error appropriately
      this.APIResponse.ExceptionError(error);
    }
  }
}
