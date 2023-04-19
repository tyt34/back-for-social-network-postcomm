const router = require('express').Router()
const { createComment, getComments } = require('../controllers/comment')

/*
const {
  logValidator, regValidator,
} = require('../middlewares/validators');
*/
//router.post('/log', login);

router.post('/createComment', createComment)
router.get('/getComments/:postID', getComments)

module.exports = router
