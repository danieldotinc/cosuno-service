import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);

  res.status(500).send('Something failed.');
};
