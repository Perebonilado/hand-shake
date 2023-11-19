import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/DatabaseProvider';
import { UserDbConnector } from './connectors/UserDbConnector';

@Module({
  providers: [...databaseProviders, UserDbConnector],
  exports: [UserDbConnector],
})
export class DatabaseModule {}
