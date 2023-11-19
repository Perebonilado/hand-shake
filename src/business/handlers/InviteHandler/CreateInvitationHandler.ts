import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InvitationRepository } from 'src/business/repository/InvitationRepository';
import { RequestTemplate } from 'src/business/request-template/RequestTemplate';
import { CreateInvitationRequest } from 'src/business/request/CreateInvitationRequest';
import { CreateInvitationResponse } from 'src/business/response/CreateInvitationResponse';
import { InvitationQueryService } from 'src/query/services/InvitationQueryService';

@Injectable()
export class CreateInvitationHandler
  implements RequestTemplate<CreateInvitationRequest, CreateInvitationResponse>
{
  constructor(
    @Inject(InvitationQueryService)
    private invitationQueryService: InvitationQueryService,
    @Inject(InvitationRepository)
    private invitationRepository: InvitationRepository,
  ) {}

  public async handle(
    request: CreateInvitationRequest,
  ): Promise<CreateInvitationResponse> {
    try {
      const invitationExists =
        await this.invitationQueryService.findByDeliverableId(
          request.data.deliverable,
        );

      if (!invitationExists) {
        const createdInvitation = await this.invitationRepository.create(
          request.data,
        );

        // send notification

        return { data: createdInvitation };
      } else
        throw new HttpException(
          `Deliverable already exists`,
          HttpStatus.BAD_REQUEST,
        );
    } catch (error) {}
  }
}
