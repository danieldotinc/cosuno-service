import { createLogger, format, transports, Logger } from 'winston';

class LoggerSingleton {
  static instance: LoggerSingleton;
  logger!: Logger;
  constructor() {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = this;
      this.init();
    }
    return LoggerSingleton.instance;
  }

  private init() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.json(),
        format.prettyPrint(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
      transports: [
        new transports.Console({ silent: process.env.NODE_ENV === 'test' }),
        new transports.File({
          filename: './logs/error.log',
          level: 'error',
        }),
        new transports.File({ filename: './logs/info.log', level: 'info' }),
      ],
      exceptionHandlers: [new transports.Console(), new transports.File({ filename: './logs/uncaughtExceptions.log' })],
    });
  }

  public getLogger() {
    return this.logger;
  }
}

const instance = new LoggerSingleton();
Object.freeze(instance);

export default instance.getLogger();
