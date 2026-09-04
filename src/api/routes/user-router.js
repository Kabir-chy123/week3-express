import express from 'express';

import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
