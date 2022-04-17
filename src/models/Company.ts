import Joi from 'joi';
import mongoose from 'mongoose';
import { specialtySchema } from './Specialty';

const CompanyModel = mongoose.model(
  'Company',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    city: {
      type: String,
      required: true,
    },
    specialties: {
      type: [specialtySchema],
      required: true,
    },
  })
);

export const validator = (company: Company) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    city: Joi.string().required(),
    specialtyIds: Joi.array().required(),
  });

  return schema.validate(company);
};

export default CompanyModel;
