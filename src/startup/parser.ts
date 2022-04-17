import { Express } from 'express';
import bodyParser from 'body-parser';

export default (app: Express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
