import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '../models/UserModel';
import { Op } from 'sequelize';

@Injectable()
export class UserDbConnector {
  async findAll(): Promise<UserModel[]> {
    try {
      return await UserModel.findAll();
    } catch (error) {
      throw new HttpException('Unable to retrieve users', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(email?: string, username?: string): Promise<UserModel> {
    try {
      return await UserModel.findOne({
        where: {
          [Op.or]: {
            email: email || '',
            username: username || '',
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        `Unable to find user with email ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(user: UserModel) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw new HttpException(
        'Failed to save user to database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
