/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

dotenv.config();

// eslint-disable-next-line import/no-extraneous-dependencies
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cookieParser());
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/cards', cardsRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
  res.status(404).send('Страница не найдена');
});

app.use(express.static(path.resolve(__dirname, 'public')));
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер');
  // eslint-disable-next-line no-console
  console.log(BASE_PATH);
});
