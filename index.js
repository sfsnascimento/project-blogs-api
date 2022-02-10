const express = require('express');
const bodyParser = require('body-parser');

const authorization = require('./middlewares/authorization');

const {
  createUser,
  login,
  getAllUsers,
  getUserById,
} = require('./controllers/user');

const {
  validations,
  loginValidations,
} = require('./middlewares/validations');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', validations, createUser);
app.post('/login', loginValidations, login);

app.use(authorization);
app.get('/user', getAllUsers);
app.get('/user/:id', getUserById);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
