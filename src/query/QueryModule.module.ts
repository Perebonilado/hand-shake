import { Module } from '@nestjs/common';
import { UserQueryService } from './services/UserQueryService';
import { DatabaseModule } from 'src/infrastructure/db/DatabaseModule.module';
import { DeliverableQueryService } from './services/DeliverableQueryService';

@Module({
  imports: [DatabaseModule],
  providers: [UserQueryService, DeliverableQueryService],
  exports: [UserQueryService, DeliverableQueryService],
})
export class QueryModule {}
