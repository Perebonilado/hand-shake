import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserQueryService } from 'src/query/services/UserQueryService';
import { verifyPassword } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userQueryService.findOne(email);

    if (verifyPassword(password, user.password)) {
      const { id, username } = user;
      const payload = {
        sub: id,
        username,
      };

      return {
        status: HttpStatus.OK,
        accessToken: await this.jwtService.signAsync(payload),
        message: 'Successful',
      };
    } else {
      throw new HttpException(
        'Wrong email/password combination',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
