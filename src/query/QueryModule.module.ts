import { Module } from '@nestjs/common';
import { UserQueryService } from './services/UserQueryService';
import { DatabaseModule } from 'src/infrastructure/db/DatabaseModule.module';
import { DeliverableQueryService } from './services/DeliverableQueryService';
import { InvitationQueryService } from './services/InvitationQueryService';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserQueryService,
    DeliverableQueryService,
    InvitationQueryService,
  ],
  exports: [UserQueryService, DeliverableQueryService, InvitationQueryService],
})
export class QueryModule {}
