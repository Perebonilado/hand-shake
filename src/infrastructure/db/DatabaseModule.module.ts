import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { UserDbConnector } from './connectors/UserDbConnector';
import { DeliverableDbConnector } from './connectors/DeliverableDbConnector';
import { InvitationDbConnector } from './connectors/InvitationDbConnector';
import { QueryModule } from 'src/query/QueryModule.module';

@Module({
  imports: [QueryModule],
  providers: [
    ...databaseProviders,
    UserDbConnector,
    DeliverableDbConnector,
    InvitationDbConnector,
  ],
  exports: [ ...databaseProviders,UserDbConnector, DeliverableDbConnector, InvitationDbConnector],
})
export class DatabaseModule {}
