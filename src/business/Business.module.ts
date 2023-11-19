import { Module } from '@nestjs/common';
import { QueryModule } from 'src/query/QueryModule.module';
import { CreateUserHandler } from './handlers/User/CreateUserHandler';
import { RepositoryModule } from 'src/infrastructure/repository/RepositoryModule.module';
import { CreateDeliverableHandler } from './handlers/DeliverablesHandler/CreateDeliverableHandler';

@Module({
  imports: [QueryModule, RepositoryModule],
  providers: [CreateUserHandler, CreateDeliverableHandler],
  exports: [CreateUserHandler, CreateDeliverableHandler],
})
export class BusinessModule {}
