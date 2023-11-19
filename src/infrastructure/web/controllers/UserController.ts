import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { CreateUserHandler } from 'src/business/handlers/User/CreateUserHandler';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UserQueryService } from 'src/query/services/UserQueryService';

@Controller('user')
export class UserController {
  constructor(
    @Inject(CreateUserHandler) private createUserHandler: CreateUserHandler,
  ) {}

  @Post('/create')
  async createUser(@Body() user: CreateUserDto) {
    try {
      return await this.createUserHandler.handle({ data: user });
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }
}
