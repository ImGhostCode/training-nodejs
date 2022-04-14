const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter an username'],
        min: 7,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: [true,  'Please enter an email'],
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: [true,  'Please enter an password'],
        min: [7, 'Minimum password length is 7 characters'],
        max: [20, 'Maximum password length is 20 characters']
    },
},{
    timestamps: true
})

accountSchema.post('save', (doc, next) => {
    console.log('New account was created ', doc )
    next()
})

accountSchema.pre('save', async function(next){
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashed = await bcryptjs.hash(this.password,salt)
        this.password = hashed
        next()
    } catch (error) {
        next(error)
    }
})

const AccountModel = mongoose.model('Accounts', accountSchema)

module.exports = AccountModel