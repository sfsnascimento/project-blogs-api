const express = require('express');
const bodyParser = require('body-parser');

const { createUser, login } = require('./controllers/user');

const { validations, loginValidations } = require('./middlewares/validations');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', validations, createUser);
app.post('/login', loginValidations, login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
