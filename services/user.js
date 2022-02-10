const { User, Category } = require('../models');
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

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  createCategory,
  getAllCategories,
};
