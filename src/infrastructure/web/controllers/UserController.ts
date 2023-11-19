import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { UserQueryService } from 'src/query/services/UserQueryService';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
  ) {}

  @Get('/retrieve-all')
  async retrieveAllUsers() {
    try {
      return await this.userQueryService.findAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
