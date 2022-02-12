const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
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
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

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
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
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

const updatePost = async (id, post, authorization) => {
  const { email } = jwt.decode(authorization, process.env.SECRET);
  const user = await User.findOne({ where: { email } });

  const { userId } = await BlogPost.findByPk(id);

  if (userId !== user.dataValues.id) return { code: 401, message: 'Unauthorized user' };
  
  if (post.categoryIds) return { code: 400, message: 'Categories cannot be edited' };
  
  await BlogPost.update({ title: post.title, content: post.content }, { where: { id } });
  
  const postById = await BlogPost.findByPk(id, {
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return postById;
};

const deletePost = async (id, authorization) => {
  const { email } = jwt.decode(authorization, process.env.SECRET);
  const user = await User.findOne({ where: { email } });

  const post = await BlogPost.findByPk(id);
  
  if (!post) return { code: 404, message: 'Post does not exist' };

  if (post.userId !== user.dataValues.id) return { code: 401, message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id } });

  return 'deleted';
};

const deleteUser = async (authorization) => {
  const { email } = jwt.decode(authorization, process.env.SECRET);

  await User.destroy({ where: { email } });
  
  return 'deleted';
};

const getBySearch = async (q) => {
  if (!q) {
    const searchAll = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return searchAll;
  }

  const search = await BlogPost.findAll({
    where: { [Op.or]: [{ title: q }, { content: q }] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  return search;
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
  deletePost,
  deleteUser,
  getBySearch,
};
