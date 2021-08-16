const router = require('express').Router();
const {
  getUser, getUsers, patchAvatarUser, patchInfoUser,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.use(auth);
// eslint-disable-next-line no-undef
router.get('/me', getUser);

// eslint-disable-next-line no-undef
router.get('/', getUsers);

router.patch('/me/avatar', patchAvatarUser);

// eslint-disable-next-line no-undef
router.patch('/me', patchInfoUser);

module.exports = router;
