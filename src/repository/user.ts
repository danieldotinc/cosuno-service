import config from 'config';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import users from '../data/users.json';

const find = async (email: string) => {
  if (config.get('isDbEnabled')) return User.findOne({ email });

  return users.find(user => user.email === email);
};
const generateAuthToken = (user: User) => jwt.sign({ ...user }, config.get('jwtPrivateKey'));

export default { find, generateAuthToken };
