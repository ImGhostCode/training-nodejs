const jwt = require('jsonwebtoken')

const generateAccessToken = id => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '200s'
    })
}

const generateRefreshToken = id => {
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}