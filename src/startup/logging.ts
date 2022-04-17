import winston from 'winston';
import 'express-async-errors';

export default () => {
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/uncaughtExceptions.log' })
  );

  process.on('unhandledRejection', ex => {
    throw ex;
  });
};
