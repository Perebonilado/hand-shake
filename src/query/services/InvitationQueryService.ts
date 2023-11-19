import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeliverablesModel } from 'src/infrastructure/db/models/DeliverablesModel';
import { InvitationsModel } from 'src/infrastructure/db/models/InvitationsModel';

@Injectable()
export class InvitationQueryService {
  async findByDeliverableId(id: number): Promise<InvitationsModel> {
    try {
      return await InvitationsModel.findOne({
        include: { model: DeliverablesModel, where: { id } },
      });
    } catch (error) {
      throw new HttpException(
        `Failed to find deliverable by deliverble id, ${id}: ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
