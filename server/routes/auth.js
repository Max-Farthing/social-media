const express = require('express')
const isauth = require('../middlewares/is-auth')

const authController = require('../controllers/auth')

const router = express.Router()

//  GET*   /auth/:userId
router.get('/:userId', isauth, authController.findUser)

//  POST*  /auth/signup
router.post('/signup', authController.signup)

//  POST*  /auth/login
router.post('/login', authController.login)

module.exports = router