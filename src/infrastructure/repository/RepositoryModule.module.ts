import { Module } from '@nestjs/common';
import { UserSequalizeRepository } from './services/UserSequalizeRepository';

@Module({
  providers: [UserSequalizeRepository],
  exports: [UserSequalizeRepository],
})
export class RepositoryModule {}
