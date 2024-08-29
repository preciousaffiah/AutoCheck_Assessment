import {
  Controller,
  Get,
  Query,
  HttpCode,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { APIResponse } from 'src/shared/response';
import { Public } from 'src/shared/decorator/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly APIResponse: APIResponse,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query('offset') offset: number = 1, @Res() res: Response) {
    const result = await this.usersService.findAll(10, offset);
    return this.APIResponse.success(HttpStatus.OK, res, result, '');
  }
}
