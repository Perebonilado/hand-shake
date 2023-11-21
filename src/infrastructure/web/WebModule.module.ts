import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { QueryModule } from 'src/query/QueryModule.module';
import { JwtModule } from '@nestjs/jwt';
import { BusinessModule } from 'src/business/Business.module';
import { AuthService } from './auth/services/AuthService';
import { DeliverableController } from './controllers/DeliverableController';
import { IntegrationModule } from 'src/integration/IntegrationModule.module';
import EnvironmentVars from 'EnvironmentVars';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: EnvironmentVars.config.jsonWebToken /* save in env eventually*/,
    }),
    QueryModule,
    BusinessModule,
    IntegrationModule,
  ],
  providers: [AuthService],
  controllers: [UserController, DeliverableController],
})
export class WebModule {}
