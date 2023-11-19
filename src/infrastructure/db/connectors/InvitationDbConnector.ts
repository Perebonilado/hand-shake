import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InvitationsModel } from '../models/InvitationsModel';

@Injectable()
export class InvitationDbConnector {
  public async create(invitation: InvitationsModel): Promise<InvitationsModel> {
    try {
      return await InvitationsModel.create(invitation);
    } catch (error) {
      throw new HttpException(
        `Failed to save invitation to db: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
