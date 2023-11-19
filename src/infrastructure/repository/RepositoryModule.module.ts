import { Module } from '@nestjs/common';
import { UserSequalizeRepository } from './services/UserSequalizeRepository';
import { DatabaseModule } from '../db/DatabaseModule.module';
import { UserRepository } from 'src/business/repository/UserRepository';
import { DeliverableRepository } from 'src/business/repository/DeliverableRepository';
import { DeliverableSequalizeRepository } from './services/DeliverableRepository';

const providers = [
  { provide: UserRepository, useClass: UserSequalizeRepository },
  {
    provide: DeliverableRepository,
    useClass: DeliverableSequalizeRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class RepositoryModule {}
