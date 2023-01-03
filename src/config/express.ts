import express, { Application } from 'express';
import cors from 'cors';

import morganMiddleware from '../middleware/morgan';

function configExpress(app: Application) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morganMiddleware);
}

export default configExpress;
