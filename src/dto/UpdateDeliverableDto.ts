import { StatusEnum } from 'src/infrastructure/web/models/StatusEnum';

export interface UpdateDeliverableDto {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: StatusEnum;
  createdBy: number;
  createdOn: Date;
  modifiedBy: number;
  modifiedOn: Date;
  isDisputed: boolean;
  dependant: number;
  price: number;
  invitationId: number;
  requiresConfrimation: boolean;
  inviteAccepted: boolean;
  isConfirmed: boolean;
}
