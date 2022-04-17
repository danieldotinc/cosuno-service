import { Request, Response, NextFunction } from 'express';
const config = require('config');

export default (req: Request, res: Response, next: NextFunction) => {
  if (!config.get('requiresAuth')) return next();

  //@ts-ignore
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
};
