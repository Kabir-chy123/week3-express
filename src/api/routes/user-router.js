import express from 'express';
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

userRouter.post('/', postUser);
userRouter.put('/:id', authenticateToken, putUser);
userRouter.delete('/:id', authenticateToken, deleteUser);

export default userRouter;
