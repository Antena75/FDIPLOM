import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // const configService = app.get(ConfigService);
  // const PORT = configService.get('HTTP_PORT');
  // await app.listen(PORT);
  const PORT = process.env.HTTP_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Hotel booking service is listening a port ${PORT}...`);
  });
}
bootstrap();
