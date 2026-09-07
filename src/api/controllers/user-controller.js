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
    const result = await modifyUser(req.body, req.params.id);

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
    const result = await removeUser(req.params.id);

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
