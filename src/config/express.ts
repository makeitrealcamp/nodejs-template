import express, { Application } from 'express';
import cors from 'cors';

import morganMiddleware from '../middleware/morgan';
import errorHandler from '../middleware/errorHandler';

function configExpress(app: Application) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morganMiddleware);
  app.use(errorHandler);
}

export default configExpress;
