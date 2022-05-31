import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { httpLogger } from 'src/logger/winston.logger.console';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    httpLogger.info(req.route.path);
    next();
  }
}

// 函数式中间件
export function logger(req, rest, next) {
  httpLogger.info(req.method + '---' + req.url);
  next();
}
