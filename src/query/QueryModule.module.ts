import { Module } from '@nestjs/common';
import { UserQueryService } from './services/UserQueryService';
import { DatabaseModule } from 'src/infrastructure/db/DatabaseModule.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserQueryService],
  exports: [UserQueryService],
})
export class QueryModule {}
