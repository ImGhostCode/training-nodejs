const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/AuthController')
const {RegisterValidator, LoginValidator} = require('../Middleware/validator')

router.post('/register', RegisterValidator, AuthController.register)
router.post('/login', LoginValidator, AuthController.login)
router.get('/register', AuthController.registerPage)
router.get('/login', AuthController.loginPage)
router.get('/refreshAccessToken', AuthController.refreshAccessToken)
router.get('/logout', AuthController.logout)


module.exports = router