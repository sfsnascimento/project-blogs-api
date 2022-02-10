const express = require('express');
const bodyParser = require('body-parser');

const authorization = require('./middlewares/authorization');

const {
  createUser,
  login,
  getAllUsers,
  getUserById,
  createCategory,
  getAllCategories,
} = require('./controllers/user');

const {
  validations,
  loginValidations,
  nameValidations,
} = require('./middlewares/validations');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', validations, createUser);
app.post('/login', loginValidations, login);

app.use(authorization);
app.get('/user', getAllUsers);
app.get('/user/:id', getUserById);
app.post('/categories', nameValidations, createCategory);
app.get('/categories', getAllCategories);
