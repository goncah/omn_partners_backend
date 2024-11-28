import {Injectable} from "@nestjs/common";
import {CreateDiscountRequest} from "../model/create.discount.request.model";
import {CreateDiscountReply} from "../model/create.discount.reply.model";

@Injectable()
export class DiscountService {
  async create(discount: CreateDiscountRequest): Promise<CreateDiscountReply> {
    return this.validate(discount);
  }

  private async validate(body: CreateDiscountReply): Promise<CreateDiscountReply> {
    // Check only validUntil, the only field API Gateway is not validating
    const regex = /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\+\d\d:\d\d$/;

    if (!regex.test(body.validUntil)) {
      return Promise.reject(new Error("Invalid ISO 8601 Date"));
    }

    const date = new Date(body.validUntil);
    date.setHours(0, 0, 0, 0);

    if (date < new Date()) {
      return Promise.reject(new Error("Date is in the past"));
    }


    return Promise.resolve(body);
  }
}
