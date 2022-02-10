const express = require('express');
const bodyParser = require('body-parser');

const { createUser } = require('./controllers/user');

const { validations } = require('./middlewares/validations');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', validations, createUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
