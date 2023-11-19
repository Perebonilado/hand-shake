import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DeliverableRepository } from 'src/business/repository/DeliverableRepository';
import { RequestTemplate } from 'src/business/request-template/RequestTemplate';
import { CreateDeliverableRequest } from 'src/business/request/CreateDeliverableRequest';
import { CreateDeliverableResponse } from 'src/business/response/CreateDeliverableResponse';
import { DeliverableQueryService } from 'src/query/services/DeliverableQueryService';

@Injectable()
export class CreateDeliverableHandler
  implements
    RequestTemplate<CreateDeliverableRequest, CreateDeliverableResponse>
{
  constructor(
    @Inject(DeliverableQueryService)
    private deliverableQueryService: DeliverableQueryService,
    @Inject(DeliverableRepository)
    private deliverableRepository: DeliverableRepository,
  ) {}

  public async handle(
    request: CreateDeliverableRequest,
  ): Promise<CreateDeliverableResponse> {
    try {
      const titleExistsForUser =
        await this.deliverableQueryService.findByTitleAndUserId(
          request.data.title,
          request.data.createdBy,
        );

      if (!titleExistsForUser) {
        const createdDeliverable = await this.deliverableRepository.create(request.data)

        // create invitation

        return { data: createdDeliverable }
      } else {
        throw new HttpException(
          `Title already exists for this user`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {}
  }
}
