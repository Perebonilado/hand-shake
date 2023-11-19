import { StatusEnum } from "src/infrastructure/web/models/StatusEnum";

export interface CreateDeliverableDto {
  title: string;
  description?: string;
  dueDate: Date;
  dependant: number,
  price: number
  invitationId?: number;
  status?: StatusEnum;
  isDisuputed?: boolean;
  createdBy?: number;
  createdOn?: Date;
  modifiedOn?: Date;
  modifiedBy?: number;
}
