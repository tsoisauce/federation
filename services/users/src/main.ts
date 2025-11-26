import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  Logger.log(`Users Application is running on: http://localhost:${process.env.PORT ?? 3001}/graphql`)
}
bootstrap();
