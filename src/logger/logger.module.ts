import { Module } from '@nestjs/common';
import { MyLoggerTwo } from './logger.service';
@Module({
  providers: [MyLoggerTwo],
  exports: [MyLoggerTwo],
})
export class LoggerModule {}
