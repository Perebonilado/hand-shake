import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { DeliverableRepository } from 'src/business/repository/DeliverableRepository';
import { CreateDeliverableDto } from 'src/dto/CreateDeliverableDto';
import { DeliverableDbConnector } from 'src/infrastructure/db/connectors/DeliverableDbConnector';
import { DeliverablesModel } from 'src/infrastructure/db/models/DeliverablesModel';
import { StatusEnum } from 'src/infrastructure/web/models/StatusEnum';

@Injectable()
export class DeliverableSequalizeRepository implements DeliverableRepository {
  constructor(
    @Inject(DeliverableDbConnector)
    private deliverableDbConnector: DeliverableDbConnector,
  ) {}

  public async create(
    payload: CreateDeliverableDto,
  ): Promise<DeliverablesModel> {
    try {
      const deliverable = {
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        status: StatusEnum.inactive,
        invitationId: payload.invitationId,
        createdBy: payload.createdBy,
        createdOn: new Date(),
        modifiedBy: payload.createdBy,
        modifiedOn: new Date(),
        isDisputed: false,
        dependant: payload.dependant,
        price: payload.price,
      } as DeliverablesModel;

      return await this.deliverableDbConnector.create(deliverable);
    } catch (error) {
      throw new HttpException(
        `Failed to create deliverable: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}