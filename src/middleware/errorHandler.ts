import { ErrorRequestHandler } from 'express';

import log from '../logger';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  log.error(err.stack);
  res.status(500).json({ msg: err.message });
};

export default errorHandler;
