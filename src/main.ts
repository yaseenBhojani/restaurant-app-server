import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule);

  // Middleware: Parse cookies
  app.use(cookieParser());

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: ['https://spiceroutekitchen.netlify.app', 'http://localhost:3000'],
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma, x-refresh-token',
  });

  // Global validation pipe to validate incoming request payloads
  app.useGlobalPipes(new ValidationPipe());

  // Start listening on the specified port (default: 3333)
  await app.listen(3000);
}

// Bootstrap the Nest application
bootstrap();
