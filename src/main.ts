import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "commons/interceptors";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import fastifyMultipart from "@fastify/multipart";

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: true,
    maxParamLength: 1000,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.register(fastifyMultipart);

  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(process.env.SYSTEM_TITLE)
    .setDescription(process.env.SYSTEM_DESCRIPTION)
    .setVersion(process.env.SYSTEM_VERSION)
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  };

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup("docs", app, swaggerDocument);

  await app.listen(Number(process.env.PORT) || 3333);
}
bootstrap();
