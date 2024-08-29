import { ConflictException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { Repository } from 'typeorm';
import { APIResponse } from 'src/shared/response';
import { RegisterLoanDto } from './dto/loan';
import { LoanStatus } from 'src/enums/role';


@Injectable()
export class LoanService {
  private logger: Logger;

  constructor(
    @InjectRepository(Loan)
    private readonly LoanRepository: Repository<Loan>,
  ) {
    this.logger = new Logger(LoanService.name);
  }

  async create(LoanData: RegisterLoanDto, user_id: string): Promise<Loan> {
    try {
      
      const existingLoan = await this.LoanRepository.findOne({
        where: {
          user_id,
          status: LoanStatus.APPROVED,
          paid: false,
        },
      });

      if (existingLoan) {
        throw new ConflictException(
          'Pay outstnding debt before taking another loan',
        );
      }

      // Create a new Loan instance
      const newLoan = this.LoanRepository.create({...LoanData, user_id});

      // Save the new Loan to the database
      let t = await this.LoanRepository.save(newLoan);

      return newLoan;

    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not request loan'); // Catch unexpected errors
    }
  }

  async findAll(limit: number, offset: number): Promise<Loan[]> {
    try {
      offset = (offset - 1) * limit;

      const Loans = await this.LoanRepository.find({
        skip: offset,
        take: limit,
      });
      return Loans;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not fetch loans'); // Catch unexpected errors
    }
  }

  async findUserLoanById(id: string, user_id: string): Promise<Loan> {
    try {
      const Loan = await this.LoanRepository.findOne({
        where: { id, user_id },
      });

      if (!Loan) {
        throw new NotFoundException('Loan not found');
      }

      return Loan;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not fetch loan'); // Catch unexpected errors
    }
  }

  async findById(id: string): Promise<Loan> {
    try {
      const Loan = await this.LoanRepository.findOne({
        where: { id },
      });

      if (!Loan) {
        throw new NotFoundException('Loan not found');
      }

      return Loan;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not fetch loan'); // Catch unexpected errors
    }
  }

  async findByUserId(user_id: string, limit: number, offset: number): Promise<Loan[]> {
    try {
      offset = (offset - 1) * limit;

      const Loans = await this.LoanRepository.find({
        where:{
          user_id
        },
        skip: offset,
        take: limit,
      });
      return Loans;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not fetch users loans'); // Catch unexpected errors
    }
  }
}
