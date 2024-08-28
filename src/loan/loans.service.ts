import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Loan } from "./entities/loan.entity";
import { Repository } from "typeorm";
import { APIResponse } from "src/shared/response";

// TODO: rewrite comments

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly LoanRepository: Repository<Loan>,
    private readonly APIResponse: APIResponse
  ) {}

  /**
   * Create a new Loan.
   * @param LoanData - The data of the Loan to create.
   * @returns A Promise that resolves to the created Loan entity.
   * @throws ConflictException if there's an error saving the Loan.
   */
  async create(LoanData: any): Promise<any> {
    // Create a new Loan instance
    const newLoan = this.LoanRepository.create(LoanData);

    try {
      // Save the new Loan to the database
      let t = await this.LoanRepository.save(newLoan);
    } catch (error) {
      this.APIResponse.ExceptionError(error);
    }

    return newLoan;
  }

  /**
   * Find all Loans with pagination.
   * @param limit - The maximum number of Loans to retrieve.
   * @param offset - The number of Loans to skip.
   * @returns A Promise that resolves to an array of Loan entities.
   */
  async findAll(limit: number, offset: number): Promise<Loan[]> {
    try {
      const Loans = await this.LoanRepository.find({
        skip: offset,
        take: limit,
      });
      return Loans;
    } catch (error) {
      // Handle the error appropriately
      this.APIResponse.ExceptionError(error);
    }
  }

  /**
   * Find a Loan by their email.
   * @param email - The email of the Loan to find.
   * @returns A Promise that resolves to the found Loan entity.
   * @throws NotFoundException if the Loan with the given email is not found.
   */
  async findById(id: string): Promise<Loan> {
    try {
      const Loan = await this.LoanRepository.findOne({
        where: { id },
      });

      if (!Loan) {
        throw new NotFoundException("Loan not found");
      }

      return Loan;
    } catch (error) {
      // Handle the error appropriately
      this.APIResponse.ExceptionError(error);
    }
  }
  
}
