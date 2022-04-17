import request from 'supertest';
import mongoose from 'mongoose';

import server from '../../index';
import Specialty from '../../models/Specialty';
import User from '../../models/User';

describe('/api/specialties', () => {
  beforeAll(async () => {
    await Specialty.deleteMany({});
  });

  afterAll(async () => {
    await server.close();
  });

  afterEach(async () => {
    await Specialty.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all specialties', async () => {
      const specialties = [{ name: 'abc' }, { name: 'def' }];

      await Specialty.insertMany(specialties);

      const res = await request(server).get('/api/specialties');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((s: Specialty) => s.name === 'abc')).toBeTruthy();
      expect(res.body.some((s: Specialty) => s.name === 'def')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a specialty if valid id is passed', async () => {
      const specialty = new Specialty({ name: 'abc' });
      await specialty.save();

      const res = await request(server).get('/api/specialties/' + specialty._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', specialty.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/specialties/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no specialty with the given id exists', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get('/api/specialties/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.
    let token: string;
    let name: string;

    const exec = async () => {
      return await request(server).post('/api/specialties').set('x-auth-token', token).send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'abc';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if specialty is less than 2 characters', async () => {
      name = 'a';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if specialty is more than 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the specialty if it is valid', async () => {
      await exec();

      const specialty = await Specialty.find({ name: 'abc' });

      expect(specialty).not.toBeNull();
    });

    it('should return the specialty if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'abc');
    });
  });

  describe('DELETE /:id', () => {
    let token: string;
    let specialty: any;
    let id: any;

    const exec = async () => {
      return await request(server)
        .delete('/api/specialties/' + id)
        .set('x-auth-token', token)
        .send();
    };

    beforeEach(async () => {
      // Before each test we need to create a specialty and
      // put it in the database.
      specialty = new Specialty({ name: 'abc' });
      await specialty.save();

      id = specialty._id;
      token = new User({ isAdmin: true }).generateAuthToken();
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if the user is not an admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if no specialty with the given id was found', async () => {
      id = new mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should delete the specialty if input is valid', async () => {
      await exec();

      const specialtyInDb = await Specialty.findById(id);

      expect(specialtyInDb).toBeNull();
    });

    it('should return the removed specialty', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', specialty._id.toHexString());
      expect(res.body).toHaveProperty('name', specialty.name);
    });
  });
});
