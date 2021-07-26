/* eslint-disable no-underscore-dangle */
const User = require('../models/user');

// eslint-disable-next-line no-undef
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((users) => res.send({ data: users }))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.patchInfoUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.patchAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
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
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
