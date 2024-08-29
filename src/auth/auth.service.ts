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
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AdminService.name);
  }

  async create(userData: CreateUserDto): Promise<any> {
    try {
      const emailExists = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }

      const bvnExists = await this.userRepository.findOne({
        where: { BVN: userData.BVN },
      });

      if (bvnExists) {
        throw new ConflictException('BVN already in use');
      }

      // Destructure password from userData and hash it separately
      const { password } = userData;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance with hashed password
      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      // Save the new user to the database
      let user = await this.userRepository.save(newUser);

      const { id, fname, lname, email, role } = user;

      const registerdUser = {
        id,
        fname,
        lname,
        email,
        role,
      };

      // // jwt token
      const access_token = await this.jwtService.signAsync({
        user_id: id,
        role: role,
      });

      return { access_token, user: registerdUser };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not register user'); // Catch unexpected errors
    }
  }

  async login(loginData: LoginDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
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
}
