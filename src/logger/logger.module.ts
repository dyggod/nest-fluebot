import { Module } from '@nestjs/common';
import { MyLoggerConsole } from './logger.service';
@Module({
  providers: [MyLoggerConsole],
  exports: [MyLoggerConsole],
})
export class LoggerModule {}
