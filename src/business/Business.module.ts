import { Module } from '@nestjs/common';
import { QueryModule } from 'src/query/QueryModule.module';
import { CreateUserHandler } from './handlers/User/CreateUserHandler';
import { RepositoryModule } from 'src/infrastructure/repository/RepositoryModule.module';

@Module({
  imports: [QueryModule, RepositoryModule],
  providers: [CreateUserHandler],
  exports: [CreateUserHandler],
})
export class BusinessModule {}
