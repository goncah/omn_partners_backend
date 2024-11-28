import { APIGatewayProxyResult } from 'aws-lambda';
import { HttpStatus } from '@nestjs/common';

export class Utils {
  static replyOf(statusCode: HttpStatus, body: any): APIGatewayProxyResult {
    return { body: JSON.stringify(body), statusCode: statusCode };
  }
}
