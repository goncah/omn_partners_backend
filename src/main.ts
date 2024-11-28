import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult, Context,
  Handler
} from "aws-lambda";
import { EventService } from './services/event.service';

export const omnapihandler: Handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const eventsService = appContext.get(EventService);
  return eventsService.process(event);
};
