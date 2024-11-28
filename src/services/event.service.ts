import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Utils } from "../utils";
import { DiscountService } from "./discount.service";

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(private readonly discountService: DiscountService) {
  }

  async process(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const body = JSON.parse(event.body!);

      if (event.httpMethod === "POST") {
        if (event.path === "/discount") {
          const discount = await this.discountService.create(body);

          return Utils.replyOf(HttpStatus.OK, discount);
        }
      }

      return Utils.replyOf(HttpStatus.BAD_REQUEST, { message: "Bad Request" });
    } catch (e) {
      return Utils.replyOf(HttpStatus.INTERNAL_SERVER_ERROR, { message: e.message });
    }
  }
}
