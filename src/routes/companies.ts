import express from 'express';

import Company, { validator } from '../models/Company';
import specialtyRepository from '../repository/specialty';
import companyRepository from '../repository/company';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import validateObjectId from '../middleware/validateObjectId';
import validate from '../middleware/validate';

const router = express.Router();

router.get('/', [auth], async (req: express.Request, res: express.Response) => {
  const companies = await companyRepository.get();
  res.send(companies);
});

router.post('/', [auth, validate(validator)], async (req: express.Request, res: express.Response) => {
  const specialties = await specialtyRepository.find(req.body.specialtyIds);
  if (!specialties.length) return res.status(400).send('Invalid specialties');

  const company = await companyRepository.create({ name: req.body.name, city: req.body.city, specialties });

  res.send(company);
});

router.put('/:id', [auth, validate(validator)], async (req: express.Request, res: express.Response) => {
  const specialties = await specialtyRepository.find(req.body.specialtyIds);
  if (!specialties.length) return res.status(400).send('Invalid specialties');

  const company = await companyRepository.update(req.params.id, {
    name: req.body.name,
    city: req.body.city,
    specialties,
  });

  if (!company) return res.status(404).send('The company with the given ID was not found.');

  res.send(company);
});

router.delete('/:id', [auth, admin], async (req: express.Request, res: express.Response) => {
  const company = await companyRepository.remove(req.params.id);

  if (!company) return res.status(404).send('The company with the given ID was not found.');

  res.send(company);
});

router.get('/:id', validateObjectId, async (req: express.Request, res: express.Response) => {
  const company = await companyRepository.findById(req.params.id);

  if (!company) return res.status(404).send('The company with the given ID was not found.');

  res.send(company);
});

export default router;
