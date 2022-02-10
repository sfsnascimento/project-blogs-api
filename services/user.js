const { User } = require('../models');
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
  const user = await User.findOne({
    where: {
      email,
      password,
    },
  });

  if (!user) return { code: 400, message: 'Invalid fields' };

  const acessToken = token(email, password);
  
  return acessToken;
};

module.exports = {
  createUser,
  login,
};
