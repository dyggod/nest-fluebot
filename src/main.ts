import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './common/logger.middleware';
import { MyLoggerConsole } from './logger/logger.service';
const host = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLoggerConsole(),
  });
  // 日志中间件
  app.use(logger);
  // http异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());

  //cores
  app.enableCors();

  // 初始化api文档
  const config = new DocumentBuilder()
    .setTitle('nest-fluebot')
    .setDescription('The fluebot API description')
    .setVersion('1.0')
    .addTag('API 文档')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 监听端口
  await app.listen(host);
  console.log(`nest-fluebot server start at: http://localhost:${host}/`);
  console.log(`nest-fluebot api docs start at: http://localhost:${host}/docs`);
}
bootstrap();
