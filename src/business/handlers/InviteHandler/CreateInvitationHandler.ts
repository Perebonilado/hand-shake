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
      const createdInvitation = await this.invitationRepository.create(
        request.data,
      );

      return { data: createdInvitation };
    } catch (error) {
      throw new HttpException(
        `Error Creating Invitation: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
