import bcrypt from 'bcrypt';
import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    req.body.role = 'user';
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const result = await addUser(req.body);

    if (!result) {
      const error = new Error('User could not be added');
      error.status = 400;
      return next(error);
    }

    res.status(201).json({
      message: 'New user added.',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    if (loggedInUser.user_id !== userId && loggedInUser.role !== 'admin') {
      const error = new Error('Not allowed to update this user');
      error.status = 403;
      return next(error);
    }

    const result = await modifyUser(req.body, userId);

    if (!result) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    res.json({
      message: 'User item updated.',
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    if (loggedInUser.user_id !== userId && loggedInUser.role !== 'admin') {
      const error = new Error('Not allowed to delete this user');
      error.status = 403;
      return next(error);
    }

    const result = await removeUser(userId);

    if (!result) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }

    res.json({
      message: 'User item deleted.',
    });
  } catch (error) {
    next(error);
  }
};
export { getUsers, getUserById, postUser, putUser, deleteUser };
