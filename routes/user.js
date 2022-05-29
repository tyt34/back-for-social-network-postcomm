const router = require('express').Router();
const {
  updatUserValidator,
} = require('../middlewares/validators');
const {
  getUser, updateUser,
} = require('../controllers/user');

router.get('/getUser', getUser);
router.patch('/updateUser', updateUser);

module.exports = router;
