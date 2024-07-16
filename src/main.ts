import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerDocument from './libs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerDocument(app);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
