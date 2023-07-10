import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule);

  // Middleware: Parse cookies
  app.use(cookieParser());

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors();

  // Global validation pipe to validate incoming request payloads
  app.useGlobalPipes(new ValidationPipe());

  // Start listening on the specified port (default: 3333)
  await app.listen(3000);
}

// Bootstrap the Nest application
bootstrap();
