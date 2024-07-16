const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router()

//  GET*   /auth/:userId
router.get('/:userId', authController.findUser)

//  POST*  /auth/signup
router.post('/signup', authController.signup)

//  POST*  /auth/login
router.post('/login', authController.login)

module.exports = router