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
import { CreateDeliverableHandler } from 'src/business/handlers/DeliverablesHandler/CreateDeliverableHandler';
import { CreateDeliverableDto } from 'src/dto/CreateDeliverableDto';

@Controller('deliverable')
export class DeliverableController {
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
    @Inject(CreateDeliverableHandler)
    private createDeliverableHandler: CreateDeliverableHandler,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createDeliverable(
    @Req() request: Request,
    @Body() payload: CreateDeliverableDto,
  ) {
    try {
      const userToken = request['user'] as VerifiedToken;

      const deliverableCreator = await this.userQueryService.findOne(
        '',
        userToken.username,
      );

      const dependant = await this.userQueryService.findById(payload.dependant);

      if (deliverableCreator && dependant) {
        if (deliverableCreator.id !== dependant.id) {
          return await this.createDeliverableHandler.handle({
            data: { ...payload, createdBy: deliverableCreator.id },
          });
        } else {
          throw new HttpException(
            'Cannot create deliverable for yourself',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else
        throw new HttpException(
          `${!dependant ? 'dependant' : 'user'} not found`,
          HttpStatus.NOT_FOUND,
        );
    } catch (error) {
      throw new HttpException(
        `Failed to create deliverable: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
