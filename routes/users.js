const router = require('express').Router();
const {
  getUser, getUsers, patchAvatarUser, getInfoUser, patchInfoUser,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.use(auth);
// eslint-disable-next-line no-undef
router.get('/me', getInfoUser);

// eslint-disable-next-line no-undef
router.get('/:id', getUser);
// eslint-disable-next-line no-undef
router.get('/', getUsers);

router.patch('/me/avatar', patchAvatarUser);

// eslint-disable-next-line no-undef
router.patch('/me', patchInfoUser);

module.exports = router;
