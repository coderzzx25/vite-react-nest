import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('The NestJS API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const swaggerDocument = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
};

export default swaggerDocument;
