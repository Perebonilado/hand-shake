import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { DeliverablesModel } from '../models/DeliverablesModel';
import { inject } from 'vue';
import { DeliverableQueryService } from 'src/query/services/DeliverableQueryService';

@Injectable()
export class DeliverableDbConnector {
  constructor(
    @Inject(DeliverableQueryService)
    private deliverableQueryService: DeliverableQueryService,
  ) {}

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
      const existingDeliverable = await this.deliverableQueryService.findById(
        deliverable.id,
      );
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
        `Error saving deliverable with id ${deliverable.id} to db`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
