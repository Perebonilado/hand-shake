import { Module } from '@nestjs/common';
import { QueryModule } from 'src/query/QueryModule.module';
import { CreateUserHandler } from './handlers/User/CreateUserHandler';
import { RepositoryModule } from 'src/infrastructure/repository/RepositoryModule.module';
import { CreateDeliverableHandler } from './handlers/DeliverablesHandler/CreateDeliverableHandler';
import { CreateInvitationHandler } from './handlers/InviteHandler/CreateInvitationHandler';
import { UpdateDeliverableHandler } from './handlers/DeliverablesHandler/UpdateDeliverableHandler';

@Module({
  imports: [QueryModule, RepositoryModule],
  providers: [
    CreateUserHandler,
    CreateDeliverableHandler,
    CreateInvitationHandler,
    UpdateDeliverableHandler
  ],
  exports: [
    CreateUserHandler,
    CreateDeliverableHandler,
    CreateInvitationHandler,
    UpdateDeliverableHandler
  ],
})
export class BusinessModule {}
