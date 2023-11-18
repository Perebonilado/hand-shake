import { Module } from '@nestjs/common';
import { QueryModule } from 'src/query/QueryModule.module';

@Module({
  imports: [QueryModule],
  providers: [],
  exports: [],
})
export class BusinessModule {}
