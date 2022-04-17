import config from 'config';

import Company from '../models/Company';

import specialties from '../data/companies.json';

const update = async (id: string, company: Partial<Company>) => Company.findByIdAndUpdate(id, company, { new: true });

const findById = async (id: string) => {
  if (config.get('isDbEnabled')) return Company.findById(id).select('-__v');

  return specialties.sort((a, b) => a.name.localeCompare(b.name));
};

const get = async () => {
  if (config.get('isDbEnabled')) return Company.find().select('-__v').sort('name');

  return specialties.sort((a, b) => a.name.localeCompare(b.name));
};

const create = async (company: Partial<Company>) => new Company(company).save();

const remove = async (id: string) => Company.findByIdAndRemove(id);

export default { update, findById, get, remove, create };
