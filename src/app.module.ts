import {
  Module,
  NestModule,
  MiddlewareConsumer,
  //RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appLogConfig } from './logger/winston.logger.console';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleAuthGuard } from './auth/guards/auth.guard';
// 路由模块
import { TaskModule } from './router/task/task.module';
// config变量
import { mongoConfig } from './config/mongodb';
// 示范中间件的使用
// import { LoggerMiddleware, logger } from './common/logger.middleware';
// import { TaskController } from './router/task/task.controller';

@Module({
  imports: [
    // 认证模块
    AuthModule,
    // 配置winston日志模块用以导出日志文件
    WinstonModule.forRoot({
      transports: appLogConfig,
    }),
    // mongodb数据库
    MongooseModule.forRoot(
      `mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}?` +
        `directConnection=true&authMechanism=SCRAM-SHA-1&authSource=admin`,
    ),
    // 路由模块
    TaskModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    /**
     * 对某个路由添加日志中间件
     * L27与L28是另外两种使用方式
     * L29是使用函数式中间件挂载方式
     */
    // consumer.apply(LoggerMiddleware).forRoutes(TaskController);
    // consumer.apply(LoggerMiddleware).forRoutes('task');
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'task', method: RequestMethod.ALL});
    // consumer.apply(logger).forRoutes(TaskController);
  }
}
