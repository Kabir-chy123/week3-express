import userItems from '../models/user-model.js';

const getUsers = (req, res) => {
  res.json(userItems);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = userItems.find((item) => item.user_id === id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};
const addUser = (req, res) => {
  const newUser = req.body;

  userItems.push(newUser);

  res.status(201).json(newUser);
};
const updateUser = (req, res) => {
  res.json({
    message: 'User item updated.',
  });
};

const deleteUser = (req, res) => {
  res.json({
    message: 'User item deleted.',
  });
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
