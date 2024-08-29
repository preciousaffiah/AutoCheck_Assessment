import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ROLES_KEY } from 'src/shared/decorator/public.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<boolean>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    try {
      const { user } = context.switchToHttp().getRequest();

      if (user.role !== Role.ADMIN) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'You do not have the necessary permissions',
            error: true,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Rethrow expected errors
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
          error: true,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;

  }
}
