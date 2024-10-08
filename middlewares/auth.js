/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(res.status(401).send({ message: 'Необходима авторизация' }));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(res.status(401).send({ message: 'Необходима авторизация' }));
    }

    req.user = payload;

    next();
  }
};
