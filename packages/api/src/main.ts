import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Nestbe')
    .setDescription('Nestbe description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const port: number = parseInt(`${process.env.PORT}`) || 3333;

  await app.listen(port, () => {
    console.log('Listening at port: ' + port);
  });
}
bootstrap();
