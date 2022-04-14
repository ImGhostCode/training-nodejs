const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const AccountModel = require('../Models/Account')

passport.use(new jwtStrategy({
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization')
}, async (payload, done) => {
    try {
        const account = await AccountModel.findById(payload.id)
        if (!account) return done(null, false)
        done(null, account)
    } catch (error) {
        done(error, false)
    }
}))