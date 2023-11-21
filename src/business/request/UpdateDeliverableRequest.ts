export interface UpdateDeliverableRequest {
  userId: number;
  deliverableId: number;
  title?: string;
  description?: string;
  dueDate?: Date;
}
