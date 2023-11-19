import { Injectable } from '@nestjs/common/decorators';
import { UserRepository } from 'src/business/repository/UserRepository';
import { UserModel } from '../../db/models/UserModel';

@Injectable()
export class UserSequalizeRepository implements UserRepository {
  async findAll(): Promise<UserModel[]> {
    return await UserModel.findAll();
  }
}
