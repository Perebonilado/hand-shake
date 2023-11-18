import { Module } from '@nestjs/common';
import { QueryModule } from './query/QueryModule.module';
import { IntegrationModule } from './integration/IntegrationModule.module';
import { DatabaseModule } from './infrastructure/db/DatabaseModule.module';
import { RepositoryModule } from './infrastructure/repository/RepositoryModule.module';
import { WebModule } from './infrastructure/web/WebModule.module';

@Module({
  imports: [
    QueryModule,
    IntegrationModule,
    DatabaseModule,
    RepositoryModule,
    WebModule
  ],
})
export class AppModule {}
