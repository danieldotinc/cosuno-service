import config from 'config';

import User from '../models/User';
import users from '../data/users.json';

const find = (email: string) => {
  if (config.get('isDbEnabled')) return User.findOne({ email });

  return users.find(user => user.email === email);
};

export default { find };
