const {check} = require('express-validator')

const RegisterValidator = [
    check('username', 'This username must me 3+ characters long')
    .isLength({min: 3}),
    check('email', 'Must be email')
    .isEmail(),
    check('password', 'Invalid password')
    .isLength({min:8, max:20})
]

const LoginValidator = [
    check('username', 'This username must me 3+ characters long' )
    .isLength({min: 3}),
    check('password', 'Invalid password')
    .isLength({min:8, max:20})
]

module.exports = {
    RegisterValidator,
    LoginValidator
}