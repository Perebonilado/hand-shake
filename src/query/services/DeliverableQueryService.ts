import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeliverablesModel } from 'src/infrastructure/db/models/DeliverablesModel';

@Injectable()
export class DeliverableQueryService {
  constructor() {}

  public async findByTitleAndUserId(
    title: string,
    userId: number,
  ): Promise<DeliverablesModel> {
    try {
      return await DeliverablesModel.findOne({
        where: { title, createdBy: userId },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding deliverable: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findById(id: number): Promise<DeliverablesModel> {
    try {
      return await DeliverablesModel.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        `Error finding deliverable by id, ${id}: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
