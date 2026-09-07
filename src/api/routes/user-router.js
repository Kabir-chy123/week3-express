import express from 'express';
import { body } from 'express-validator';
import { validationErrors } from '../../middlewares/error-handlers.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post(
  '/',
  body('email').trim().isEmail(),
  body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('password').trim().isLength({ min: 8 }),
  validationErrors,
  postUser,
);
userRouter.put(
  '/:id',
  authenticateToken,
  body('name').optional().trim().isLength({ min: 2, max: 50 }),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .isAlphanumeric(),
  body('email').optional().trim().isEmail(),
  body('password').optional().trim().isLength({ min: 8 }),
  validationErrors,
  putUser,
);
userRouter.delete('/:id', authenticateToken, deleteUser);

export default userRouter;
