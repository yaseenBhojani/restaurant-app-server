import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());
  // app.enableCors({
  //   origin: 'https://spiceroutekitchen.netlify.app',
  //   credentials: true, // Allow sending and receiving cookies across origins
  // });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

bootstrap();
