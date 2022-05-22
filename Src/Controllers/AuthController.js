const AccountModel = require('../Models/Account')
const {generateAccessToken, generateRefreshToken} = require('../utils/generateToken')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

const loginPage = (req, res) => {

    res.render('Login')
    //res.json(req)
    //console.log(req)
}

const registerPage = (req, res) => {
    res.render('Register')
}

const register = asyncHandler( async (req, res) => {
    const {username, password, email} = req.body
    
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        const alert = errors.array()
        return res.render('Register', {alert})
    }
    const isExist = await AccountModel.findOne({username})
    if (isExist){
        res.status(400)
        throw new Error('Account already exists')
    }
    try {
        
        const newAccount = new AccountModel({
            username,
            password,
            email
        })
        const result = await newAccount.save()
        res.redirect('/auth/login')
        
    } catch (error) {
        res.status(500).json(error)
    }
})

const login = asyncHandler( async (req, res) =>{
    const {username, password} = req.body
    const errors = validationResult(req)
    
    if (!errors.isEmpty()){
        const alert = errors.array()
        return res.render('Login', {alert})
    }
    try {
        const account = await AccountModel.findOne({username})
        if (!account) return res.render('Login', {alert: [{msg:'Username not exist'}]})
        
        const result = await bcrypt.compare(password, account.password)
        if (!result) return res.render('Login',{alert: [{msg:'Wrong password'}]})
        const id = account._id
        const AccessToken = generateAccessToken(account._id)
        const RefreshToken = generateRefreshToken(account._id)
        let token = `Bearer ${AccessToken}`
        res.setHeader('Authorization', token)
        res.cookie('accessToken', AccessToken, {httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*100})
        res.cookie('refreshToken', RefreshToken, {httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*100})
        //res.status(200).json(account._doc)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

const refreshAccessToken = (req ,res) => {
    let cookies = req.cookies
    if (!cookies.refreshToken)// return res.status(401).json('Not authentication, no refresh token')
    return res.status(401).redirect('/auth/login')
    let refreshToken = cookies.refreshToken
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        //if (req.user.id !== decoded.id) return res.status(403).json('Refresh Token failed')

        const newAccessToken = generateAccessToken(decoded.id)
        res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
        res.cookie('accessToken', newAccessToken, {httpOnly:true, sameSite:'none', secure: true, maxAge: 24*60*60*100})
        return res.redirect('/')
    } catch (error) {
       
        res.status(403).redirect('/auth/login')
    }
}

const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies.accessToken) return res.status(204)
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.redirect('/auth/login')
}

module.exports = {
    register,
    login,
    loginPage,
    registerPage,
    refreshAccessToken,
    logout
}