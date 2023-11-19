import {
  Controller,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Body,
  Req,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/AuthGuard';
import { VerifiedToken } from '../models/VerifiedToken';
import { UserQueryService } from 'src/query/services/UserQueryService';

@Controller('deliverable')
export class DeliverableController {
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createDeliverable(@Req() request: Request) {
    try {
      // create deliverable handler
      const userToken = request['user'] as VerifiedToken;

      const deliverableCreator = await this.userQueryService.findOne(
        '',
        userToken.username,
      );
      
      if(deliverableCreator){
        
      } else throw new HttpException('user not found', HttpStatus.NOT_FOUND)

      return deliverableCreator;
    } catch (error) {
      throw new HttpException(
        `Failed to create deliverable: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
