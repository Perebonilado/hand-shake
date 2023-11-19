export interface CreateInvitationDto {
    sentTo: number;
    deliverable: number;
    status: string;
    createdBy: number;
    createdOn: Date
}