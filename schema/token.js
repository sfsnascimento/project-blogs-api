require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET, {
    algorithm: 'HS256',
  });

  return token;
};