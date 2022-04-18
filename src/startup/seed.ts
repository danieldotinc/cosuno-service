import logger from '../logger';
import Specialty from '../models/Specialty';
import Company from '../models/Company';
import User from '../models/User';

const companiesData = [
  {
    name: 'AssistHome',
    city: 'Munich',
    specialties: [
      {
        name: 'Plumbing',
      },
      {
        name: 'Electricity',
      },
      {
        name: 'Parquet',
      },
      {
        name: 'Painting',
      },
      {
        name: 'Windows',
      },
      {
        name: 'Piping',
      },
    ],
  },
  {
    name: 'Building101',
    city: 'Berlin',
    specialties: [
      {
        name: 'Plumbing',
      },
      {
        name: 'Windows',
      },
      {
        name: 'Piping',
      },
    ],
  },
  {
    name: 'Check24',
    city: 'Munich',
    specialties: [
      {
        name: 'Electricity',
      },
      {
        name: 'Painting',
      },
      {
        name: 'Windows',
      },
      {
        name: 'Carpeting',
      },
      {
        name: 'InteriorDesign',
      },
    ],
  },
  {
    name: 'FurnishNow',
    city: 'Frankfurt',
    specialties: [
      {
        name: 'Parquet',
      },
      {
        name: 'Painting',
      },
    ],
  },
  {
    name: 'Home2Home',
    city: 'Hamburg',
    specialties: [
      {
        name: 'Transportation',
      },
      {
        name: 'Logistics',
      },
    ],
  },
  {
    name: 'MullerBrothers',
    city: 'Berlin',
    specialties: [
      {
        name: 'Electricity',
      },
      {
        name: 'Painting',
      },
      {
        name: 'Gardening',
      },
    ],
  },
  {
    name: 'Solid Foundation',
    city: 'Achen',
    specialties: [
      {
        name: 'Plumbing',
      },
      {
        name: 'Electricity',
      },
      {
        name: 'Painting',
      },
      {
        name: 'Windows',
      },
      {
        name: 'Piping',
      },
      {
        name: 'Carpeting',
      },
      {
        name: 'Furnishing',
      },
      {
        name: 'InteriorDesign',
      },
    ],
  },
];

const specialtiesData = [
  {
    name: 'Carpeting',
  },
  {
    name: 'Electricity',
  },
  {
    name: 'Furnishing',
  },
  {
    name: 'Gardening',
  },
  {
    name: 'InteriorDesign',
  },
  {
    name: 'Logistics',
  },
  {
    name: 'Painting',
  },
  {
    name: 'Parquet',
  },
  {
    name: 'Piping',
  },
  {
    name: 'Plumbing',
  },
  {
    name: 'Transportation',
  },
  {
    name: 'Windows',
  },
];

const usersData = [
  {
    name: 'Daniel',
    email: 'daniel@gmail.com',
    password: '$2b$10$fOGKtxXIZ9fDgoc3gz5WPOeJOIfTmCWIFOsYvOuxnUvurwA76ja1S',
  },
  {
    name: 'Adam',
    email: 'adam@gmail.com',
    password: '$2b$10$IjTVpRvt7NX5uRrjVpQcmOYkPU9/qw.UVKJZtnr/pSxdfu6BgdFlG',
  },
  {
    name: 'Max',
    email: 'max@gmail.com',
    password: '$2b$10$4xpoxjm5EsMLTsS5bVIzIuhwxdkm/FaAkLJTDZyu/cVETluCL.spq',
  },
];

const seed = async () => {
  logger.info('Start seeding DB with data...');

  logger.info('Deleting existing companies and specialties...');
  await Company.deleteMany({});
  await Specialty.deleteMany({});
  await User.deleteMany({});

  logger.info('Creating new specialties...');
  const specialtyMap: { [key: string]: string } = {};
  for (let specialty of specialtiesData) {
    const { _id: specialtyId } = await new Specialty({ name: specialty.name }).save();
    specialtyMap[specialty.name] = specialtyId;
  }

  logger.info('Creating new companies...');
  for (let company of companiesData) {
    const specialties = company.specialties.map(sp => ({ name: sp.name, _id: specialtyMap[sp.name] }));
    await new Company({ name: company.name, city: company.city, specialties }).save();
  }

  logger.info('Creating new users...');
  for (let user of usersData) {
    await new User({ name: user.name, email: user.email, password: user.password }).save();
  }

  logger.info('Seeding process is Done!');
};

export default seed;
