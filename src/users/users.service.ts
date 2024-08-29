import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async findAll(limit: number, offset: number): Promise<User[]> {
    try {
      offset = (offset - 1) * limit;

      const users = await this.userRepository.find({
        skip: offset,
        take: limit,
      });
      return users;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }
      throw new InternalServerErrorException('Could not get users'); // Catch unexpected errors
    }
  }
}
