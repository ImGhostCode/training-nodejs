const express = require('express')
const router = express.Router()
const HomeController = require('../Controllers/HomeController')
const authenticator = require('../Middleware/authenticator')

router.get('/', authenticator, HomeController.homePage)

module.exports = router