import { Module } from '@nestjs/common';
import { QueryModule } from './query/QueryModule.module';
import { IntegrationModule } from './integration/IntegrationModule.module';
import { DatabaseModule } from './infrastructure/db/DatabaseModule.module';
import { RepositoryModule } from './infrastructure/repository/RepositoryModule.module';
import { WebModule } from './infrastructure/web/WebModule.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    QueryModule,
    IntegrationModule,
    DatabaseModule,
    RepositoryModule,
    WebModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
})
export class AppModule {}
