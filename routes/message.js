const router = require('express').Router();
const {
  createMes,
} = require('../controllers/message');

/*
const {
  logValidator, regValidator,
} = require('../middlewares/validators');
*/
//router.post('/log', login);

router.post('/createMes', createMes);

module.exports = router;
