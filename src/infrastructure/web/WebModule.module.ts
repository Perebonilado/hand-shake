import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { QueryModule } from 'src/query/QueryModule.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtToken } from 'src/constants';
import { BusinessModule } from 'src/business/Business.module';
import { AuthService } from './auth/services/AuthService';
import { DeliverableController } from './controllers/DeliverableController';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtToken /* save in env eventually*/,
    }),
    QueryModule,
    BusinessModule,
  ],
  providers: [AuthService],
  controllers: [UserController, DeliverableController],
})
export class WebModule {}
