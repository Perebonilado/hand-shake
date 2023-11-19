import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from 'src/business/repository/UserRepository';
import { RequestTemplate } from 'src/business/request-template/RequestTemplate';
import { CreateUserRequest } from 'src/business/request/CreateUserRequest';
import { CreateUserResponse } from 'src/business/response/CreateUserResponse';
import { UserQueryService } from 'src/query/services/UserQueryService';

@Injectable()
export class CreateUserHandler
  implements RequestTemplate<CreateUserRequest, CreateUserResponse>
{
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
    @Inject(UserRepository)
    private userRepository: UserRepository,
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
        `Failed to handle user creation request: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
