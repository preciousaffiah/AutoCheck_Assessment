import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Set up global logging with the default logger
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Specify log levels if needed
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
