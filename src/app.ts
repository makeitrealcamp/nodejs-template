import express from 'express';
import { createServer } from 'http';

import expressConfig from './src/config/express';
import connectDB from './src/config/database';
import swaggerDocs from './src/config/swagger';
import routes from './routes';
import { connectSocket } from './src/config/socket';
import errorHandler from './middleware/errorHandler';

// setup server
const app = express();
export const server = createServer(app);

const env = process.env.NODE_ENV;
const port = process.env.PORT || 8080;

if (env !== 'test') {
  connectDB();
}

// setup express
expressConfig(app);
// Socket
connectSocket(server);
// routes
routes(app);
// Swagger
swaggerDocs(app, port as number);
// error handling
app.use(errorHandler);

export default app;
