import {
  Controller,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Body,
  Req,
  Inject,
  Get,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/AuthGuard';
import { VerifiedToken } from '../models/VerifiedToken';
import { UserQueryService } from 'src/query/services/UserQueryService';
import { CreateDeliverableHandler } from 'src/business/handlers/DeliverablesHandler/CreateDeliverableHandler';
import { CreateDeliverableDto } from 'src/dto/CreateDeliverableDto';
import { DeliverableQueryService } from 'src/query/services/DeliverableQueryService';
import { UpdateDeliverableHandler } from 'src/business/handlers/DeliverablesHandler/UpdateDeliverableHandler';
import { UpdateDeliverableDto } from 'src/dto/UpdateDeliverableDto';

@Controller('deliverable')
export class DeliverableController {
  constructor(
    @Inject(UserQueryService) private userQueryService: UserQueryService,
    @Inject(CreateDeliverableHandler)
    private createDeliverableHandler: CreateDeliverableHandler,
    @Inject(DeliverableQueryService)
    private deliverableQueryService: DeliverableQueryService,
    @Inject(UpdateDeliverableHandler)
    private updateDeliveryHandler: UpdateDeliverableHandler,
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

  @UseGuards(AuthGuard)
  @Get('/retrieve-created')
  async getCreatedDeliverables(@Req() request: Request) {
    try {
      const userToken = request['user'] as VerifiedToken;
      const user = await this.userQueryService.findOne('', userToken.username);

      return await this.deliverableQueryService.findCreatedDeliverables(
        user.id,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to find deliverables created: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('/retrieve-dependent')
  async getDependentDeliverables(@Req() request: Request) {
    try {
      const userToken = request['user'] as VerifiedToken;
      const user = await this.userQueryService.findOne('', userToken.username);

      return await this.deliverableQueryService.findDependentDeliverables(
        user.id,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to find deliverables created: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Put('/update')
  async updateDeliverable(
    @Req() request: Request,
    @Body() updateDeliveryDto: UpdateDeliverableDto,
  ) {
    try {
      const userToken = request['user'] as VerifiedToken;
      const user = await this.userQueryService.findOne('', userToken.username);
      
      return await this.updateDeliveryHandler.handle({
        data: updateDeliveryDto,
        userId: user.id,
      });
    } catch (error) {
      throw new HttpException(
        `Failed to update deliverable: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
