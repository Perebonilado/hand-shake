import { StatusEnum } from "src/infrastructure/web/models/StatusEnum";

export interface CreateDeliverableDto {
  title: string;
  description?: string;
  dueDate: Date;
  status: StatusEnum;
  dependant: number,
  price: number
  isDisuputed?: boolean;
  createdBy?: number;
  createdOn?: Date;
  modifiedOn?: Date;
  modifiedBy?: number;
}
