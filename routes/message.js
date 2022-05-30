const router = require('express').Router();
const {
  createMes,
  getAllMes,
  getMesProf,
  getMesUser
} = require('../controllers/message');

/*
const {
  logValidator, regValidator,
} = require('../middlewares/validators');
*/
//router.post('/log', login);

router.post('/createMes', createMes);
router.get('/getAllMes/:userId', getAllMes);
router.get('/getmesprof', getMesProf);
router.get('/getMesUser/:nameUser', getMesUser);


module.exports = router;
