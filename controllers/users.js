/* eslint-disable no-underscore-dangle */
const User = require('../models/user');

// eslint-disable-next-line no-undef
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        res.status(404).send({
          message: 'Пользователь не найден.',
        });
      }
      res.send({ data: users });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
    });
};

module.exports.patchInfoUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Пользователь не найден.',
        });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
    });
};

module.exports.patchAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Пользователь не найден.',
        });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
    });
};

// eslint-disable-next-line no-undef
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((Users) => res.send({ data: Users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// eslint-disable-next-line no-undef
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    // eslint-disable-next-line no-shadow
    .then((User) => res.send({ data: User }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
    });
};
