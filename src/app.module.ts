import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware, logger } from './common/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { consoleConfig } from './logger/winston.logger.console';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
// 路由模块
import { TaskModule } from './router/task/task.module';
import { TaskController } from './router/task/task.controller';

@Module({
  imports: [
    AuthModule,
    // 配置winston日志模块
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(consoleConfig),
        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'nest-fluebot-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    // 路由模块
    TaskModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    /**
     * 对某个路由添加日志中间件
     * L27与L28是另外两种使用方式
     * L29是使用函数式中间件挂载方式
     */
    consumer.apply(LoggerMiddleware).forRoutes(TaskController);
    // consumer.apply(LoggerMiddleware).forRoutes('task');
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'task', method: RequestMethod.ALL});
    // consumer.apply(logger).forRoutes(TaskController);
  }
}
