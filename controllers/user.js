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

module.exports = {
  createUser,
  login,
};
