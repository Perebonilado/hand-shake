import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DeliverableRepository } from 'src/business/repository/DeliverableRepository';
import { RequestTemplate } from 'src/business/request-template/RequestTemplate';
import { UpdateDeliverableRequest } from 'src/business/request/UpdateDeliverableRequest';
import { UpdateDeliverableResponse } from 'src/business/response/UpdateDeliverableResponse';
import { UpdateDeliverableDto } from 'src/dto/UpdateDeliverableDto';
import { StatusEnum } from 'src/infrastructure/web/models/StatusEnum';
import { DeliverableQueryService } from 'src/query/services/DeliverableQueryService';

@Injectable()
export class UpdateDeliverableHandler
  implements
    RequestTemplate<UpdateDeliverableRequest, UpdateDeliverableResponse>
{
  constructor(
    @Inject(DeliverableQueryService)
    private deliverableQueryService: DeliverableQueryService,
    @Inject(DeliverableRepository)
    private deliverableRepository: DeliverableRepository,
  ) {}

  public async handle(
    request: UpdateDeliverableRequest,
  ): Promise<UpdateDeliverableResponse> {
    try {
      const existingDeliverable = await this.deliverableQueryService.findById(
        request.data.id,
      );

      if (!existingDeliverable) {
        throw new HttpException(
          `the deliverable you are trying to update does not exist with id ${request.data.id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (existingDeliverable.createdBy != request.userId) {
        throw new HttpException(
          'You may only update a deliverable you created',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (existingDeliverable.status != StatusEnum.inactive) {
        throw new HttpException(
          'You may only update a deliverable that has not been accepted by a dependant',
          HttpStatus.BAD_REQUEST,
        );
      }

      const deliverableToUpdate: UpdateDeliverableDto = {
        id: existingDeliverable.id,
        title: request.data.title,
        price: request.data.price,
        description: request.data.description,
        dueDate: existingDeliverable.dueDate,
        status: existingDeliverable.status,
        createdBy: existingDeliverable.createdBy,
        createdOn: existingDeliverable.createdOn,
        modifiedBy: existingDeliverable.modifiedBy,
        modifiedOn: existingDeliverable.modifiedOn,
        isDisputed: existingDeliverable.isDisputed,
        dependant: existingDeliverable.dependant,
        invitationId: existingDeliverable.invitationId,
        requiresConfirmation: existingDeliverable.requiresConfirmation,
        inviteAccepted: existingDeliverable.inviteAccepted,
        isConfirmed: existingDeliverable.isConfirmed,
      }

      return {
        data: await this.deliverableRepository.update(deliverableToUpdate),
      };
    } catch (error) {
      throw new HttpException(
        `Failed to handle deliverable update: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
