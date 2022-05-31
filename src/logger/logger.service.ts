import {
  LoggerService,
  Logger,
  Injectable,
  Scope,
  ConsoleLogger,
} from '@nestjs/common';
import { errorLogger } from './winston.logger.console';

export class MyLogger implements LoggerService {
  log(message: string) {
    /* your implementation */
  }
  error(message: string, trace: string) {
    /* your implementation */
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
}

@Injectable({ scope: Scope.TRANSIENT })
export class MyLoggerConsole extends ConsoleLogger {
  log(message: string, trace: string) {
    super.log(message, trace);
  }
  error(message: string, trace: string) {
    errorLogger.error(message + '---' + trace);
    super.error(message, trace);
  }
}
