const router = require('express').Router();
const {
  getUser, getUsers, createUser, patchAvatarUser, patchInfoUser,
} = require('../controllers/users');

// eslint-disable-next-line no-undef
router.get('/:id', getUser);

// eslint-disable-next-line no-undef
router.get('/', getUsers);

router.patch('/me/avatar', patchAvatarUser);

// eslint-disable-next-line no-undef
router.patch('/me', patchInfoUser);

// eslint-disable-next-line no-undef
router.post('/', createUser);

module.exports = router;
