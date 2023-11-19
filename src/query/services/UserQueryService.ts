import { Inject, Injectable } from '@nestjs/common';
import { UserDbConnector } from 'src/infrastructure/db/connectors/UserDbConnector';
import { UserModel } from 'src/infrastructure/db/models/UserModel';

@Injectable()
export class UserQueryService {
  constructor(
    @Inject(UserDbConnector) private userDbConnector: UserDbConnector,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return await this.userDbConnector.findAll();
  }

  async findOne(email: string) {
    return await this.userDbConnector.findOne(email)
  }
}
