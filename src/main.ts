import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Nestbe')
    .setDescription('Nestbe description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const port: number = parseInt(`${process.env.PORT}`) || 3000;

  // @ts-ignore
  await app.listen(port, (err): void => {
    console.log(`Port: ${port}`);

    if (err) throw err;

    console.log('%c Server running', 'color: green');
  });
}
bootstrap();
