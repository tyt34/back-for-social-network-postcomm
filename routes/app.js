const router = require('express').Router();
const {
  login, register,
} = require('../controllers/app');
const {
  logValidator, regValidator,
} = require('../middlewares/validators');

router.post('/log', logValidator, login);
router.post('/reg', regValidator, register);

module.exports = router;
