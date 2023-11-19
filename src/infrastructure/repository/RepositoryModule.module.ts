import { Module } from '@nestjs/common';
import { UserSequalizeRepository } from './services/UserSequalizeRepository';
import { DatabaseModule } from '../db/DatabaseModule.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserSequalizeRepository],
  exports: [UserSequalizeRepository],
})
export class RepositoryModule {}
