import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDbConnector } from 'src/infrastructure/db/connectors/UserDbConnector';
import { UserModel } from 'src/infrastructure/db/models/UserModel';

@Injectable()
export class UserQueryService {
  constructor(
    @Inject(UserDbConnector) private userDbConnector: UserDbConnector,
  ) {}

  async findAll(): Promise<UserModel[]> {
    try {
      return await this.userDbConnector.findAll();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve users: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(email: string, username?: string) {
    try {
      return await this.userDbConnector.findOne(email, username);
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
