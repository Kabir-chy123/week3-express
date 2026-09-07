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

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    req.body.role = 'user';
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const result = await addUser(req.body);

    if (result) {
      res.status(201).json({
        message: 'New user added.',
        result,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    if (loggedInUser.user_id !== userId && loggedInUser.role !== 'admin') {
      return res.sendStatus(403);
    }

    const result = await modifyUser(req.body, userId);

    if (result) {
      res.json({
        message: 'User item updated.',
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    if (loggedInUser.user_id !== userId && loggedInUser.role !== 'admin') {
      return res.sendStatus(403);
    }

    const result = await removeUser(userId);

    if (result) {
      res.json({
        message: 'User item deleted.',
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
