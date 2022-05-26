const express = require('express');
const auth = require('../middlewares/auth');
const NotFoundAddress = require('../errors/not-found-address');

const router = express.Router();

router.use('/', require('./app'));

router.use(auth);
router.use('/', require('./user'));
router.use('/', require('./movie'));

router.use(() => {
  throw new NotFoundAddress();
});

module.exports = router;
