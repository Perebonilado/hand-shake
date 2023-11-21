import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeliverablesModel } from '../models/DeliverablesModel';

@Injectable()
export class DeliverableDbConnector {
  constructor() {}

  public async create(
    deliverable: DeliverablesModel,
  ): Promise<DeliverablesModel> {
    try {
      return await DeliverablesModel.create(deliverable);
    } catch (error) {
      throw new HttpException(
        `Failure to save deliverable: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async update(
    deliverable: DeliverablesModel,
  ): Promise<DeliverablesModel> {
    try {
      const existingDeliverable = await DeliverablesModel.findOne({
        where: { id: deliverable.id },
      });
      if (existingDeliverable) {
        Object.assign(existingDeliverable, deliverable);

        return await existingDeliverable.save();
      } else {
        throw new HttpException(
          `Deliverable with id ${deliverable.id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
