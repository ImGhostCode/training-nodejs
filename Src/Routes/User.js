const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')
const authenticator = require('../Middleware/authenticator')

router.get('/posts', authenticator, UserController.getMyPost)

module.exports = router