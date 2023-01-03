import { ErrorRequestHandler } from 'express';

import log from '../logger';

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  log.error(err.stack);
  res.status(500).json({ msg: err.message });
};

export default errorHandler;
