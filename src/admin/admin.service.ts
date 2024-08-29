import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto, UpdateLoanStatusDto } from './dto/admin.dto';
import { Loan } from 'src/loan/entities/loan.entity';
import { LoanStatus } from 'src/enums/role';
import { LoginDto } from 'src/auth/dto/user.dto';

@Injectable()
export class AdminService {
  private logger: Logger;

  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,

    private readonly jwtService: JwtService,

  ) {
    this.logger = new Logger(AdminService.name);
  }

  async create(userData: CreateAdminDto): Promise<any> {
    try {
      const emailExists = await this.adminRepository.findOne({
        where: { email: userData.email },
      });

      if (!emailExists) {
        // Destructure password from userData and hash it separately
        const { password } = userData;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with hashed password
        const newUser = this.adminRepository.create({
          ...userData,
          password: hashedPassword,
        });

        // Save the new user to the database
        await this.adminRepository.save(newUser);

        this.logger.log('Admin user seeded');
      } else {
        this.logger.log('Admin user already exists');
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not register admin'); // Catch unexpected errors
    }
  }


  async login(loginData: LoginDto): Promise<any> {
    try {
      const user = await this.adminRepository.findOne({
        where: { email: loginData.email },
      });

      if (!user) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: true,
        });
      }

      // Compare the password
      const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.password,
      );
      if (!passwordMatch) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: 'Invalid email or password',
            error: true,
          },
          HttpStatus.CONFLICT,
        );
      }

      const { id, fname, lname, role, email } = user;

      const loggedInuser = {
        id,
        fname,
        lname,
        email,
        role,
      };

      //jwt token
      const access_token = await this.jwtService.signAsync({
        user_id: user.id,
        role: user.role,
      });

      return { access_token, user: loggedInuser };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not register user'); // Catch unexpected errors
    }
  }

  async approveLoanStatus(userData: UpdateLoanStatusDto): Promise<any> {
    try {
      const findLoan = await this.loanRepository.findOne({
        where: {
          id: userData.id,
        },
      });

      if (!findLoan) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Loan not found',
          error: true,
        });
      }
      const approve = await this.loanRepository.update(userData.id, {
        status: LoanStatus.APPROVED,
      });

      return approve;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not approve loan'); // Catch unexpected errors
    }
  }

  async declineLoanStatus(userData: UpdateLoanStatusDto): Promise<any> {
    try {
      const findLoan = await this.loanRepository.findOne({
        where: {
          id: userData.id,
        },
      });

      if (!findLoan) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Loan not found',
          error: true,
        });
      }
      const approve = await this.loanRepository.update(userData.id, {
        status: LoanStatus.DECLINED,
      });

      return approve;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not decline loan'); // Catch unexpected errors
    }
  }
}
