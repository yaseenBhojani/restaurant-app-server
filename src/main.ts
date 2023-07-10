import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app.module';

async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule);

  // Middleware: Parse cookies
  app.use(cookieParser());

  // Reverse Proxy Configuration
  const reverseProxyConfig = {
    target: 'https://restaurant-app-server-chi.vercel.app',
    changeOrigin: true,
    headers: {
      'Access-Control-Allow-Origin': 'https://spiceroutekitchen.netlify.app',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  };

  // Enable Reverse Proxy
  app.use('/auth', createProxyMiddleware(reverseProxyConfig));

  // Global validation pipe to validate incoming request payloads
  app.useGlobalPipes(new ValidationPipe());

  // Start listening on the specified port (default: 3333)
  await app.listen(3000);
}

// Bootstrap the Nest application
bootstrap();
