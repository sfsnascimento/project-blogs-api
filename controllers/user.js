const user = require('../services/user');

const createUser = async (req, res) => {
  const newUser = req.body;

  const acessToken = await user.createUser(newUser);

  if (acessToken.message) return res.status(acessToken.code).json({ message: acessToken.message }); 

  return res.status(201).json({ token: acessToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const acessToken = await user.login(email, password);

  if (acessToken.message) return res.status(acessToken.code).json({ message: acessToken.message });

  return res.json({ token: acessToken });
};

const getAllUsers = async (_req, res) => {
  const users = await user.getAllUsers();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const userById = await user.getUserById(id);

  if (userById.message) return res.status(userById.code).json({ message: userById.message });

  return res.status(200).json(userById);
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  const create = await user.createCategory(name);

  return res.status(201).json(create);
};

const getAllCategories = async (_req, res) => {
  const allCategories = await user.getAllCategories();

  return res.status(200).json(allCategories);
};

const createPost = async (req, res) => {
  const { authorization } = req.headers;
  const postInfo = req.body;

  const dataValues = await user.createPost(postInfo, authorization);

  if (dataValues.message) return res.status(dataValues.code).json({ message: dataValues.message });

  return res.status(201).json(dataValues);
};

const getAllPosts = async (_req, res) => {
  const posts = await user.getAllPosts();

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const postById = await user.getPostById(id);
  
  if (postById.message) return res.status(postById.code).json({ message: postById.message });

  return res.status(200).json(postById);
};

const updatePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const post = req.body;

  const updated = await user.updatePost(id, post, authorization);

  if (updated.message) return res.status(updated.code).json({ message: updated.message });

  return res.status(200).json(updated);
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  createCategory,
  getAllCategories,
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
