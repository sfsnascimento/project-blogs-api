const user = require('../services/user');

const createUser = async (req, res) => {
  const newUser = req.body;

  const acessToken = await user.createUser(newUser);

  if (acessToken.message) res.status(acessToken.code).json({ message: acessToken.message }); 

  res.status(201).json({ token: acessToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const acessToken = await user.login(email, password);

  if (acessToken.message) res.status(acessToken.code).json({ message: acessToken.message });

  res.json({ token: acessToken });
};

const getAllUsers = async (req, res) => {
  const users = await user.getAllUsers();

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const userById = await user.getUserById(id);

  if (userById.message) res.status(userById.code).json({ message: userById.message });

  res.status(200).json(userById);
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
};
