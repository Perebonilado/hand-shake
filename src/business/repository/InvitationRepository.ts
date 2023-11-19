import { CreateInvitationDto } from "src/dto/CreateInvitationDto";
import { InvitationsModel } from "src/infrastructure/db/models/InvitationsModel";


export abstract class InvitationRepository {
    abstract create(invitation: CreateInvitationDto): Promise<InvitationsModel>
}