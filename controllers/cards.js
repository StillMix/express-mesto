/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const Card = require('../models/card');
const { Errors } = require('../middlewares/errors');

// eslint-disable-next-line no-undef
module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        Errors(res, null, 404);
      } else {
        if (card.owner === req.user._id) {
          Card.findByIdAndDelete(card._id)
            .then((cardDel) => res.send({ data: cardDel }));
        }
        return res.status(403).send({ message: 'Можно удалять только свои карточки' });
      }
    })
    .catch((err) => {
      Errors(res, err);
    });
};

// eslint-disable-next-line no-undef
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      Errors(res, err);
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
      Errors(res, err);
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
        Errors(res, null, 404);
      } else {
        res.send({ data: card.likes });
      }
    })
    .catch((err) => {
      Errors(res, err);
    });
};

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      Errors(res, null, 404);
    } else {
      res.send({ data: card.likes });
    }
  })
  .catch((err) => {
    Errors(res, err);
  });
