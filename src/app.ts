import express from 'express';
import { createServer } from 'http';

import expressConfig from './config/express';
import connectDB from './config/database';
import swaggerDocs from './config/swagger';
import routes from './routes';
import { connectSocket } from './config/socket';
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
// Error handler
app.use(errorHandler);

export default app;
