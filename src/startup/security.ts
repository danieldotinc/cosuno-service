import { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export default (app: Express) => {
  app.use(cors());
  app.use(helmet());
};
