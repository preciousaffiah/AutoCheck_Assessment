import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Connection } from "mysql2";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { APIResponse } from "src/shared/response";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  private readonly APIResponse: APIResponse;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(userData: any): Promise<any> {
    try {
      const emailExists = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (emailExists) {
        throw new ConflictException("User already exists");
      }

      const bvnExists = await this.userRepository.findOne({
        where: { BVN: userData.bvn },
      });

      if (bvnExists) {
        throw new ConflictException("BVN already in use");
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
      const user = await this.userRepository.save(newUser);

      //jwt token
      // const access_token = await this.jwtService.signAsync({
      //   user_id: user.id,
      //   role: user.role,
      // });
      return user;
      // return { access_token, user: user };
    } catch (error) {
      this.APIResponse.ExceptionError(error);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new HttpException("Invalid email or password", 401);
      }

      const { id, fname, lname, role } = user;

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
      this.APIResponse.ExceptionError(error);
    }
  }
}
