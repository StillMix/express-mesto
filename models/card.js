/* eslint-disable quotes */
/* eslint-disable quote-props */
const mongoose = require('mongoose');
const validator = require('mongoose-validator');

const cardSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link:
  {
    type: String,
    required: true,
    validate: {
      validator: (ava) => validator.isURL(ava),
      message: 'Неверная ссылка',
    },
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: {
    type: Array,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
