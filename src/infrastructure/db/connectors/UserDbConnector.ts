import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '../models/UserModel';

@Injectable()
export class UserDbConnector {
  async findAll(): Promise<UserModel[]> {
    try {
      return await UserModel.findAll();
    } catch (error) {
      throw new HttpException('Unable to retrieve users', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(email: string): Promise<UserModel> {
    try {
      return await UserModel.findOne({ where: { email } });
    } catch (error) {
      throw new HttpException(
        `Unable to find user with email ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
