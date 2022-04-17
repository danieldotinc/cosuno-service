import config from 'config';
import mongoose from 'mongoose';

import logger from '../logger';
import seed from './seed';

export default () => {
  const isDbEnabled: string = config.get('isDbEnabled');
  if (isDbEnabled) {
    const db: string = config.get('db');
    mongoose.connect(db).then(() => {
      logger.info(`Connected to ${db}...`);
      if (process.env.NODE_ENV !== 'test') seed();
    });
  }
};
