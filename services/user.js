const jwt = require('jsonwebtoken');
const { User, Category, BlogPost } = require('../models');
const token = require('../schema/token');

const createUser = async (newUser) => {
  const findUser = await User.findOne({
    where: {
      email: newUser.email,
    },
  });

  if (!findUser) {
    await User.create(newUser);
    
    const acessToken = token(newUser);
    
    return acessToken;
  }
  
  return {
    code: 409,
    message: 'User already registered',
  };
};

const login = async (email, password) => {
  const payload = {
    email,
    password,
  };

  const user = await User.findOne({
    where: {
      email,
      password,
    },
  });

  if (!user) return { code: 400, message: 'Invalid fields' };

  const acessToken = token(payload);
  
  return acessToken;
};

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const userById = await User.findByPk(id);

  if (!userById) return { code: 404, message: 'User does not exist' };

  return userById.dataValues;
};

const createCategory = async (name) => {
  const create = await Category.create({ name });

  return create;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();

  return allCategories;
};

const createPost = async ({ title, content, categoryIds }, authorization) => {
  const exist = await Category.findOne({
    where: {
      id: categoryIds,
    },
  });

  if (!exist) return { code: 400, message: '"categoryIds" not found' };

  const { email } = jwt.decode(authorization, process.env.SECRET);

  const { id } = await User.findOne({
    where: {
      email,
    },
  });

  const { dataValues } = await BlogPost
    .create({ userId: id, title, content, published: new Date(), updated: new Date() });

  return dataValues;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return posts;
};

const getPostById = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!postById) return { code: 404, message: 'Post does not exist' };

  return postById;
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
};
