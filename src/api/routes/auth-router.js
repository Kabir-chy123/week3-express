import express from 'express';
import { body } from 'express-validator';
import { validationErrors } from '../../middlewares/error-handlers.js';

import { postLogin, getMe } from '../controllers/auth-controller.js';

import { authenticateToken } from '../../middlewares/authentication.js';

const authRouter = express.Router();
authRouter.post(
  '/login',
  body('username').trim().notEmpty(),
  body('password').trim().notEmpty(),
  validationErrors,
  postLogin,
);

authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
