import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from 'commons/interceptors';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: true,
    maxParamLength: 1000
  })

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new TransformInterceptor())
  
  await app.listen(3000);
}
bootstrap();
