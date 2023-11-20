import { Inject, Controller, Get, Post } from "@nestjs/common";

@Controller('payment')
export class PaymanetController {

    @Post('/pay-by-transfer')
    async payByTransfer(){
        
    }

}