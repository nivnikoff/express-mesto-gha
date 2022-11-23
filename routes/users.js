const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);
router.get('/me', getCurrentUser);

module.exports = router;
