import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PaystackPaymentChannels } from "./paystack/PaystackPaymentChannels";

@Module({
    imports: [HttpModule],
    providers:[PaystackPaymentChannels],
    exports: [PaystackPaymentChannels]
})
export class IntegrationModule {}