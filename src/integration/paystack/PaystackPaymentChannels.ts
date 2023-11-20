import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  PayWithTransferModel,
  PayWithTransferPayloadModel,
} from 'src/infrastructure/web/models/Paystack';
import { PayWithTransferDto } from 'src/dto/PayStack.dto';

@Injectable()
export class PaystackPaymentChannels {
  constructor(@Inject(HttpService) private httpService: HttpService) {}

  baseUrl = 'https://api.paystack.co/charge';

  public async payWithTransfer(): Promise<PayWithTransferModel> {
    try {
      const response = await this.httpService.axiosRef.get<
        PayWithTransferPayloadModel,
        PayWithTransferDto
      >(this.baseUrl, {headers: {Authorization: `Bearer --token--`}});

      const {
        account_expires_at,
        account_name,
        account_number,
        amount,
        bank,
        reference,
        status,
      } = response.data;

      return {
        accountName: account_name,
        accountNumber: account_number,
        amount: amount,
        expiresAt: account_expires_at,
        reference: reference,
        status: status,
        bankName: bank.name,
      };
    } catch (error) {
      throw new HttpException(
        `Error initiating payment: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
