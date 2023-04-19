const router = require('express').Router()
const { updatUserValidator } = require('../middlewares/validators')
const {
  getUser,
  updateUser,
  getAva,
  getAllUsers
} = require('../controllers/user')

router.get('/getUser', getUser)
router.get('/getallusers', getAllUsers)
router.patch('/updateUser', updateUser)
router.get('/getava/:userId', getAva)

module.exports = router
