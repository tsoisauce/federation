import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './services/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add health check route for the wait-on command
  app.getHttpAdapter().get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  
  // Seed initial user data
  const usersService = app.get(UsersService);
  await usersService.seedInitialData();
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Users service is running on: ${await app.getUrl()}`);
}
bootstrap();
