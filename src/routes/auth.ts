import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import User from '../models/User';
import validate from '../middleware/validate';

const router = express.Router();

const validator = (user: User) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

router.post('/', [validate(validator)], async (req: express.Request, res: express.Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

export default router;
