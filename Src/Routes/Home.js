const express = require('express')
const router = express.Router()
const HomeController = require('../Controllers/HomeController')
const authenticator = require('../Middleware/authenticator')
const passport = require('passport') 
require('../Middleware/passportJwt')

//router.get('/', passport.authenticate('jwt', {session: false}), HomeController.homePage)
router.get('/', authenticator, HomeController.homePage)

router.get('/secret', passport.authenticate('jwt', {session: false}), (req, res) =>{
    res.status(200).json({resources: true})
})

module.exports = router