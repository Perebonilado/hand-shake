import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  Get
} from '@nestjs/common';
import { CreateUserHandler } from 'src/business/handlers/User/CreateUserHandler';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { LoginUserDto } from 'src/dto/LoginUserDto';
import { AuthService } from '../auth/services/AuthService';
import { AuthGuard } from '../auth/guards/AuthGuard';
import { UserQueryService } from 'src/query/services/UserQueryService';

@Controller('user')
export class UserController {
  constructor(
    @Inject(CreateUserHandler) private createUserHandler: CreateUserHandler,
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserQueryService) private userQueryService: UserQueryService
  ) {}

  @Post('/create')
  async createUser(@Body() user: CreateUserDto) {
    try {
      return await this.createUserHandler.handle({ data: user });
    } catch (error) {
      throw new HttpException(`Error creating user: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.signIn(loginUserDto);
    } catch (error) {
      throw new HttpException(`Login failed: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

}
