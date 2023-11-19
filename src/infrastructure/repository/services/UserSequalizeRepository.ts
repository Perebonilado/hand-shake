import { Injectable, Inject } from '@nestjs/common/decorators';
import { UserRepository } from 'src/business/repository/UserRepository';
import { UserModel } from '../../db/models/UserModel';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { hashPassword } from 'src/utils';
import { UserDbConnector } from 'src/infrastructure/db/connectors/UserDbConnector';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserSequalizeRepository implements UserRepository {
  constructor(
    @Inject(UserDbConnector) private userDbConnector: UserDbConnector,
  ) {}

  public async create(user: CreateUserDto) {
    try {
      const newUser = {
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        password: await hashPassword(user.password),
        username: user.username,
      } as UserModel;

      return await this.userDbConnector.create(newUser);
    } catch (error) {
      throw new HttpException(
        'Failure saving user to db',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
