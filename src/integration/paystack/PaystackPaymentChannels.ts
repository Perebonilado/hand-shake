import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  MetaDataModel,
  PayWithTransferModel,
  PayWithTransferPayloadModel,
} from 'src/infrastructure/web/models/Paystack';
import { PayWithTransferDto } from 'src/dto/PayStack.dto';
import EnvironmentVars from 'EnvironmentVars';

@Injectable()
export class PaystackPaymentChannels {
  constructor(@Inject(HttpService) private httpService: HttpService) {}

  private baseUrl = EnvironmentVars.config.paystack.baseUrl;
  private secretKey = EnvironmentVars.config.paystack.secret;

  public async payWithTransfer(
    payload: PayWithTransferPayloadModel<MetaDataModel>,
  ): Promise<PayWithTransferModel> {
    try {
      const response = await this.httpService.axiosRef.post<
        PayWithTransferPayloadModel<MetaDataModel>,
        PayWithTransferDto
      >(this.baseUrl, payload, {
        headers: { Authorization: `Bearer ${this.secretKey}` },
      });

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
