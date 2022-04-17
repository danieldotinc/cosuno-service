import { Express } from 'express';
import logging from './logging';
import security from './security';
import routes from './routes';
import parser from './parser';
import config from './config';
import db from './db';

export default (app: Express) => {
  parser(app);
  config();
  logging();
  security(app);
  routes(app);
  db();
};
