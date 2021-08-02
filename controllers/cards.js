/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Card = require('../models/card');

// eslint-disable-next-line no-undef
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Карточка не найдена.',
        });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении пользователя.',
        });
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
    });
};

// eslint-disable-next-line no-undef
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Карточка не найдена.',
        });
      } else {
        res.send({ data: card.likes });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при лайке карточки.',
        });
      }
      res.status(500).send({
        message: 'Ошибка по умолчанию.',
      });
    });
};

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(404).send({
        message: 'Карточка не найдена.',
      });
    } else {
      res.send({ data: card.likes });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: 'Переданы некорректные данные при дизлайке карточки.',
      });
    }
    res.status(500).send({
      message: 'Ошибка по умолчанию.',
    });
  });
