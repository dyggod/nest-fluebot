import * as winston from 'winston';
import * as dayjs from 'dayjs';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const { format } = winston;
const { combine, printf, timestamp: timeFunc, colorize, label, json } = format;

const myFormat = printf(({ level, message, tag, timestamp, stack }) => {
  // console.log('tag: ', tag);
  return `${dayjs(new Date(timestamp).getTime()).format(
    'YYYY-MM-DD HH:mm:ss',
  )} [${tag || 'app'}] ${level}: ${message} - ${stack}`;
});

function getConsoleConfig(tag?: string, level?: string) {
  return {
    level: level || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike(tag || 'App', {
        prettyPrint: true,
      }),
    ),
  };
}

function getFileConfig(tag?: string) {
  return {
    dirname: 'logs',
    filename: 'nest-fluebot-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: combine(timeFunc(), label({ label: tag || 'App' }), json()),
  };
}

// export const consoleConfig = {
//   level: 'info',
//   format: combine(errors({ stack: true }), colorize(), timeFunc(), myFormat),
// };
export const consoleConfig = getConsoleConfig();

export const appLogConfig = [
  new winston.transports.Console(consoleConfig),
  new winston.transports.DailyRotateFile(getFileConfig()),
];

export const httpLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(getConsoleConfig('Http')),
    new winston.transports.DailyRotateFile(getFileConfig('Http')),
  ],
});

export const errorLogger = winston.createLogger({
  transports: [new winston.transports.DailyRotateFile(getFileConfig('Error'))],
});
