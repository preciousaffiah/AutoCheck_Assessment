import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class APIResponse {
  private readonly logger = new Logger(APIResponse.name);

  error(error: any, res: Response) {
    this.logger.error(error.message, error.stack);

    return res.status(error.status).json({
      statusCode: error.status,
      error: true,
      message: error.message,
    });
  }

  success(status: HttpStatus, res: Response, data?: any, message?: string) {
    return res.status(status).json({
      statusCode: status,
      error: false,
      message: message,
      data: data,
    });
  }
  
  ExceptionError(error: any) {
    if (error instanceof HttpException) {
      throw error; // Rethrow expected errors
    }
    throw new InternalServerErrorException(); // Catch unexpected errors
  }
}
