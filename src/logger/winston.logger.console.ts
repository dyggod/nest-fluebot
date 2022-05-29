import * as winston from 'winston';
import * as dayjs from 'dayjs';

const { format } = winston;
const { combine, printf, timestamp: timeFunc, colorize, errors } = format;
const myFormat = printf(
  ({ level, message, tag, timestamp, stack }) =>
    `${dayjs(new Date(timestamp).getTime()).format('YYYY-MM-DD HH:mm:ss')} [${
      tag || 'app'
    }] ${level}: ${message} - ${stack}`,
);

export const consoleConfig = {
  level: 'info',
  format: combine(errors({ stack: true }), colorize(), timeFunc(), myFormat),
};
