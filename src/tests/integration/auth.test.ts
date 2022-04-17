import request from 'supertest';

import server from '../../index';

import User from '../../models/User';
import Specialty from '../../models/Specialty';

describe('auth middleware', () => {
  beforeAll(async () => {
    await Specialty.deleteMany({});
  });

  afterAll(async () => {
    await server.close();
  });

  afterEach(async () => {
    await Specialty.deleteMany({});
  });

  let token: string;

  const exec = () => request(server).post('/api/specialties').set('x-auth-token', token).send({ name: 'abc' });

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a';

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
