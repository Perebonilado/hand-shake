import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { UserDbConnector } from './connectors/UserDbConnector';
import { DeliverableDbConnector } from './connectors/DeliverableDbConnector';
import { InvitationDbConnector } from './connectors/InvitationDbConnector';

@Module({
  providers: [
    ...databaseProviders,
    UserDbConnector,
    DeliverableDbConnector,
    InvitationDbConnector,
  ],
  exports: [UserDbConnector, DeliverableDbConnector, InvitationDbConnector],
})
export class DatabaseModule {}
