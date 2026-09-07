import express from 'express';

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

userRouter.put('/:id', putUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;
