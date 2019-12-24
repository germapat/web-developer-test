import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new ConfigService();
  const port = config.get('APP_PORT') || 3001;

  await app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
}

bootstrap();
