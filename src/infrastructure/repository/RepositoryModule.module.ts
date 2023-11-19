import { Module } from '@nestjs/common';
import { UserSequalizeRepository } from './services/UserSequalizeRepository';
import { DatabaseModule } from '../db/DatabaseModule.module';
import { UserRepository } from 'src/business/repository/UserRepository';
import { DeliverableRepository } from 'src/business/repository/DeliverableRepository';
import { DeliverableSequalizeRepository } from './services/DeliverableSequalizeRepository';
import { InvitationRepository } from 'src/business/repository/InvitationRepository';
import { InvitationSequalizeRepository } from './services/InvitationSequalizeRepository';

const providers = [
  { provide: UserRepository, useClass: UserSequalizeRepository },
  {
    provide: DeliverableRepository,
    useClass: DeliverableSequalizeRepository,
  },
  {
    provide: InvitationRepository,
    useClass: InvitationSequalizeRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class RepositoryModule {}
