import mongoose from 'mongoose';

import seed from './seed';
import log from '../logger';

async function connectDB() {
  const dbUri = process.env.MONGO_DB_URI as string;
  const env = process.env.NODE_ENV;

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(dbUri);

    if (env !== 'production') {
      log.info('Populating database with seed data...');
      seed();
    }

    log.info('MongoDB Connected');
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
}

export default connectDB;
