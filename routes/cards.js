const router = require('express').Router();
const {
  deleteCard, getCards, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// eslint-disable-next-line no-undef
router.delete('/:id', deleteCard);

// eslint-disable-next-line no-undef
router.get('/', getCards);

// eslint-disable-next-line no-undef
router.post('/', createCard);

// eslint-disable-next-line no-undef
router.delete('/:id/likes', dislikeCard);

// eslint-disable-next-line no-undef
router.put('/:id/likes', likeCard);

module.exports = router;
