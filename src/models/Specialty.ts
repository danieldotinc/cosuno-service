import Joi from 'joi';
import mongoose from 'mongoose';

export const specialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
});

const SpecialtyModel = mongoose.model('Specialties', specialtySchema);

export const validator = (specialty: Specialty) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(specialty);
};

export default SpecialtyModel;
