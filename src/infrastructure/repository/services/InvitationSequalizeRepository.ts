import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InvitationRepository } from 'src/business/repository/InvitationRepository';
import { CreateInvitationDto } from 'src/dto/CreateInvitationDto';
import { InvitationDbConnector } from 'src/infrastructure/db/connectors/InvitationDbConnector';
import { InvitationsModel } from 'src/infrastructure/db/models/InvitationsModel';
import { InvitationStatusEnum } from 'src/infrastructure/web/models/InvitationStatusEnum';

@Injectable()
export class InvitationSequalizeRepository implements InvitationRepository {
  constructor(
    @Inject(InvitationDbConnector)
    private invitationDbConnector: InvitationDbConnector,
  ) {}

  public async create(
    invitation: CreateInvitationDto,
  ): Promise<InvitationsModel> {
    try {
      const invitation_ = {
        sentTo: invitation.sentTo,
        status: InvitationStatusEnum.pending,
        createdBy: invitation.createdBy,
        createdOn: new Date(),
      } as unknown as InvitationsModel;

      return await this.invitationDbConnector.create(invitation_);
    } catch (error) {
      throw new HttpException(
        `Failed to create invitation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
