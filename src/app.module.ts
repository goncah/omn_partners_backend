import { Module } from '@nestjs/common';
import { EventService } from "./services/event.service";
import { DiscountService } from "./services/discount.service";

@Module({
  imports: [],
  providers: [DiscountService, EventService],
})
export class AppModule {}
