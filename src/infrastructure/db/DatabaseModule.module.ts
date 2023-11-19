import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { UserDbConnector } from './connectors/UserDbConnector';
import { DeliverableDbConnector } from './connectors/DeliverableDbConnector';

@Module({
  providers: [...databaseProviders, UserDbConnector, DeliverableDbConnector],
  exports: [UserDbConnector, DeliverableDbConnector],
})
export class DatabaseModule {}
