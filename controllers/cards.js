/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Card = require('../models/card');

// eslint-disable-next-line no-undef
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// eslint-disable-next-line no-undef
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(400).send({ message: 'Переданны некоректные данные' });
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// eslint-disable-next-line no-undef
module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link })
    // eslint-disable-next-line no-shadow
    .then((Card) => res.send({ data: Card }))
    .catch(() => {
      res.status(400).send({ message: 'Переданны некоректные данные' });
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true }
    .catch(() => {
      res.status(400).send({ message: 'Переданны некоректные данные' });
      res.status(500).send({ message: 'Произошла ошибка' });
    }),
);

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
    .catch(() => {
      res.status(404).send({ message: 'Пользователь не найден' });
      res.status(400).send({ message: 'Переданны некоректные данные' });
      res.status(500).send({ message: 'Произошла ошибка' });
    }),
);
