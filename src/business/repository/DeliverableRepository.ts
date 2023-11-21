import { CreateDeliverableDto } from 'src/dto/CreateDeliverableDto';
import { UpdateDeliverableDto } from 'src/dto/UpdateDeliverableDto';
import { DeliverablesModel } from 'src/infrastructure/db/models/DeliverablesModel';

export abstract class DeliverableRepository {
  abstract create: (
    payload: CreateDeliverableDto,
  ) => Promise<DeliverablesModel>;

  abstract update: (
    payload: UpdateDeliverableDto,
  ) => Promise<DeliverablesModel>;
}
