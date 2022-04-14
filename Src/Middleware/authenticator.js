const AccountModel = require('../Models/Account')
const jwt = require('jsonwebtoken')


const authenticator = async (req, res, next) => {
    let accessToken  = req.cookies.accessToken
    // if (req.headers.authorization && 
    //     req.headers.authorization.startsWith("Bearer"))
    
    {
        try {
           // token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            req.user = await AccountModel.findById(decoded.id)
            next()
        } catch (error) {
            return res.redirect('/auth/refreshAccessToken')
            //return res.status(401).json('Not authorized, token failed. Login again')
        }
    }

    if (!accessToken){
        return res.redirect('/auth/login')
       // return res.status(403).json('Not authentication, no token')
    }
}

module.exports = authenticator