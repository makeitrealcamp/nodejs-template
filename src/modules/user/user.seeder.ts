import { faker } from '@faker-js/faker';

import User from './user.model';
import log from '../../logger';

const users = Array.from({ length: 10 }, () => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(['ADMIN', 'INSTRUCTOR', 'MAKER']),
    avatar: faker.image.avatar(),
  }
));

const seed = async () => {
  try {
    const usersData = await User.find({});

    if (usersData.length > 0) {
      return;
    }

    const result = await User.insertMany(users);
    log.info(`User model, successfully seed: ${result.length} documents`);
  } catch (error: any) {
    log.error(error);
  }
};

export default seed;
