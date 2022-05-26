const router = require('express').Router();
const {
  updatUserValidator,
} = require('../middlewares/validators');
const {
  getUser, updateUser,
} = require('../controllers/user');

router.get('/users/me', getUser);
router.patch('/users/me', updatUserValidator, updateUser);

module.exports = router;
