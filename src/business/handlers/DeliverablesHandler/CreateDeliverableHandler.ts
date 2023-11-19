import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DeliverableRepository } from 'src/business/repository/DeliverableRepository';
import { RequestTemplate } from 'src/business/request-template/RequestTemplate';
import { CreateDeliverableRequest } from 'src/business/request/CreateDeliverableRequest';
import { CreateDeliverableResponse } from 'src/business/response/CreateDeliverableResponse';
import { DeliverableQueryService } from 'src/query/services/DeliverableQueryService';
import { CreateInvitationHandler } from '../InviteHandler/CreateInvitationHandler';
import { InvitationStatusEnum } from 'src/infrastructure/web/models/InvitationStatusEnum';

@Injectable()
export class CreateDeliverableHandler
  implements
    RequestTemplate<CreateDeliverableRequest, CreateDeliverableResponse>
{
  constructor(
    @Inject(DeliverableQueryService)
    private deliverableQueryService: DeliverableQueryService,
    @Inject(DeliverableRepository)
    private deliverableRepository: DeliverableRepository,
    @Inject(CreateInvitationHandler)
    private createInvitationHandler: CreateInvitationHandler,
  ) {}

  public async handle(
    request: CreateDeliverableRequest,
  ): Promise<CreateDeliverableResponse> {
    try {
      const titleExistsForUser =
        await this.deliverableQueryService.findByTitleAndUserId(
          request.data.title,
          request.data.createdBy,
        );

      if (!titleExistsForUser) {
        const createdInvitation = await this.createInvitationHandler.handle({
          data: {
            createdBy: request.data.createdBy,
            createdOn: request.data.createdOn,
            sentTo: request.data.dependant,
            status: InvitationStatusEnum.pending,
          },
        });

        const createdDeliverable = await this.deliverableRepository.create({
          ...request.data,
          invitationId: createdInvitation.data.id,
        });

        return { data: createdDeliverable };
      } else {
        throw new HttpException(
          `Title already exists for this user`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Error handling deliverable creation: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
