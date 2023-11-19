import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserQueryService } from 'src/query/services/UserQueryService';
import { verifyPassword } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/LoginUserDto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
    private jwtService: JwtService,
  ) {}

  async signIn(payload: LoginUserDto) {
    const user = await this.userQueryService.findOne(payload.email);

    if (verifyPassword(payload.password, user.password)) {
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
