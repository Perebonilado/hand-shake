import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeliverablesModel } from '../models/DeliverablesModel';

@Injectable()
export class DeliverableDbConnector {
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
}
