import express from 'express';

import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validate from '../middleware/validate';
import validateObjectId from '../middleware/validateObjectId';

import specialtyRepository from '../repository/specialty';
import { validator } from '../models/Specialty';
import logger from '../logger';

const router = express.Router();

router.get('/', [], async (req: express.Request, res: express.Response) => {
  logger.info('Request for getting the list of specialties...');
  const specialties = await specialtyRepository.get();
  res.send(specialties);
});

router.post('/', [auth, validate(validator)], async (req: express.Request, res: express.Response) => {
  logger.info('Request for creating a specialty: ' + req.body.name);
  const specialty = await specialtyRepository.create(req.body.name);
  res.json({ name: specialty.name, _id: specialty._id });
});

router.delete('/:id', [auth, admin, validateObjectId], async (req: express.Request, res: express.Response) => {
  const specialty = await specialtyRepository.remove(req.params.id);
  logger.info('Request for deleting a specialty: ' + specialty.name);

  if (!specialty) return res.status(404).send('The specialty with the given ID was not found.');

  res.send(specialty);
});

router.get('/:id', validateObjectId, async (req: express.Request, res: express.Response) => {
  const specialty = await specialtyRepository.findById(req.params.id);
  logger.info('Request for getting a specialty: ' + specialty.name);

  if (!specialty) return res.status(404).send('The specialty with the given ID was not found.');

  res.send(specialty);
});

export default router;
