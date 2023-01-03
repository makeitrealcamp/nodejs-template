/* eslint-disable import/first */
import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: `${__dirname}/${envFile}` });

import { server } from './app';
import log from './logger';

function startServer() {
  const PORT = process.env.PORT as string || 8080;
  server.listen(PORT, () => {
    log.info(`Server running 🤖🚀 at http://localhost:${PORT}/`);
  });
}

setImmediate(startServer);

export default server;
