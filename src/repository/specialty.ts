import config from 'config';

import Specialty from '../models/Specialty';

import specialties from '../data/specialties.json';

const find = async (specialtyIds: string[]) => {
  if (config.get('isDbEnabled')) return Specialty.find({ _id: { $in: specialtyIds } }).select('-__v');

  return specialties.filter(sp => specialtyIds.includes(sp._id));
};

const findById = async (id: string) => {
  if (config.get('isDbEnabled')) return Specialty.findById(id).select('-__v');

  return specialties.sort((a, b) => a.name.localeCompare(b.name));
};

const get = async () => {
  if (config.get('isDbEnabled')) return Specialty.find().select('-__v').sort('name');

  return specialties.sort((a, b) => a.name.localeCompare(b.name));
};

const create = async (name: string) => new Specialty({ name }).save();

const remove = async (id: string) => Specialty.findByIdAndRemove(id);

export default { find, findById, get, remove, create };
