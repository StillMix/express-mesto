/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validate = require('mongoose-validator');

const userSchema = new mongoose.Schema({
  name:
  {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about:
  {
    type: String,
    default: 'Исследователь океана',
    minlength: 2,
    maxlength: 30,
  },
  avatar:
  {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (ava) => validator.isURL(ava),
      message: 'Неверная ссылка',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
