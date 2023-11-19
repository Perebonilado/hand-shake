import { CreateDeliverableDto } from "src/dto/CreateDeliverableDto";
import { DeliverablesModel } from "src/infrastructure/db/models/DeliverablesModel";

export abstract class DeliverableRepository {
   abstract create: (payload: CreateDeliverableDto)=>Promise<DeliverablesModel>
}