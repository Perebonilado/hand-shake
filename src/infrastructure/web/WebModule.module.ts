import { Module } from '@nestjs/common';
import { UserController } from './controllers/UserController';
import { QueryModule } from 'src/query/QueryModule.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtToken } from 'src/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtToken /* save in env eventually*/,
      signOptions: { expiresIn: '60s' },
    }),
    QueryModule,
  ],
  providers: [],
  controllers: [UserController],
})
export class WebModule {}
