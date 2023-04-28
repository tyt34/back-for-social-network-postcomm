const router = require('express').Router()
const { login, register } = require('../controllers/app')
// import { login, reqister } from '../controllers/app'

// const {
//   logValidator,
//   regValidator
// } = require('../middlewares/validators')

router.post('/log', login)
router.post('/reg', register)

module.exports = router
