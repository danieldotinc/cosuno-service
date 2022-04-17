import express from 'express';

import auth from '../routes/auth';
import users from '../routes/users';
import companies from '../routes/companies';
import specialties from '../routes/specialties';

import error from '../middleware/error';

export default (app: express.Express) => {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/companies', companies);
  app.use('/api/specialties', specialties);
  app.use(error);
};
