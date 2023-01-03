import seedUser from '../modules/user/user.seeder';

async function seed() {
  await Promise.all([
    seedUser(),
  ]);
}

export default seed;
