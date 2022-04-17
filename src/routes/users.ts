import bcrypt from 'bcrypt';
import express from 'express';
import _ from 'lodash';

import User, { validator } from '../models/User';
import auth from '../middleware/auth';
import validate from '../middleware/validate';

const router = express.Router();

router.get('/me', auth, async (req: express.Request, res: express.Response) => {
  //@ts-ignore
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', [validate(validator)], async (req: express.Request, res: express.Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email']));
});

export default router;
