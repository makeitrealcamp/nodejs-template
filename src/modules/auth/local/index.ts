import { Router } from 'express';

import {
  handleLoginUser,
  handleValidateUser,
} from './local.controller';

const router = Router();

// Login
// POST /auth/local/login
router.post('/login', handleLoginUser);
// Verify email
// POST /auth/local/activate/kbnsdffkhjdshkfsdfsdf
router.get('/activate/:token', handleValidateUser);

export default router;
