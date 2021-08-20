/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Errors } = require('../middlewares/errors');

const JWT_SECRET  = process.env.JWT_SECRET;

// eslint-disable-next-line no-undef
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      if (!users) {
        Errors(res, null, 404);
      }
      return res.send({ data: users });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      Errors(res, err);
    });
};

module.exports.getInfoUser = (req, res) => {
  User.findById(req.user._id)
    .then((users) => {
      if (!users) {
        Errors(res, null, 404);
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      Errors(res, err);
    });
};

module.exports.patchInfoUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: 'Поле "имя" или "о себе" не указаны' });
  }

  if (name === null || about === null) {
    return res.status(400).send({ message: 'Поле "имя" или "о себе" не указаны' });
  }

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        Errors(res, null, 404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      Errors(res, err);
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
        Errors(res, null, 404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      Errors(res, err);
    });
};

// eslint-disable-next-line no-undef
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((Users) => res.send({ data: Users }))
    .catch((err) => Errors(res, err));
};

// eslint-disable-next-line no-undef
module.exports.createUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email или пароль не указаны' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Пользователь уже создан' });
      }

      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            email,
            password: hash,
          })
            .then((user) => res.status(201).send(user))
            .catch((err) => {
              Errors(res, err);
            });
        });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password, res)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      })
        .status(200).send({ user: user.toJSON() });
    })
    .catch((err) => {
      Errors(res, err);
    });
};
