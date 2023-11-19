import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { QueryModule } from 'src/query/QueryModule.module';

@Module({
  imports: [QueryModule],
  controllers: [UserController],
})
export class WebModule {}
