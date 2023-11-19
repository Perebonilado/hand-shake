import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/UserModel';

@Injectable()
export class UserDbConnector {
  async findAll(): Promise<UserModel[]> {
    return await UserModel.findAll();
  }
}
