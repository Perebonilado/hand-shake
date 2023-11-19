import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RequestTemplate } from 'src/business/request-template/RequestTemplate';
import { CreateUserRequest } from 'src/business/request-template/User/CreateUserRequest';
import { CreateUserResponse } from 'src/business/request-template/User/CreateUserResponse';
import { UserSequalizeRepository } from 'src/infrastructure/repository/services/UserSequalizeRepository';
import { UserQueryService } from 'src/query/services/UserQueryService';

@Injectable()
export class CreateUserHandler
  implements RequestTemplate<CreateUserRequest, CreateUserResponse>
{
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
    @Inject(UserSequalizeRepository)
    private userRepository: UserSequalizeRepository,
  ) {}

  public async handle(request: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      const userExists = await this.userQueryService.findOne(
        request.data.email,
        request.data.username,
      );

      if (!userExists) {
        const createdUser = await this.userRepository.create({
          ...request.data,
        });

        return { user: createdUser };
      } else {
        throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(
        'failed to handle user creation request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
