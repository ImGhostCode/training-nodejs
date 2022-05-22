const express = require('express')
const methodOverride = require('method-override')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const db = require('./Config/connectdb')
const AuthRouter = require('./Routes/Auth')
const UserRouter = require('./Routes/User')
const PostRouter = require('./Routes/Post')
const HomeRouter = require('./Routes/Home')
const {notFound, errorHandler} = require('./Middleware/errorHandler')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const fs = require('fs')
//const client = require('./Config/connectRedis')



const app = express()

//port
const PORT =  process.env.PORT || 5500

//middleware
app.use(cors())
app.use(express.static(path.join(__dirname, 'Public')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
  }))

//connect database
db.connect()
mongoose.connection.on('connected', () => {
    console.log('Connect to database success!')
})
mongoose.connection.on('error', (error) => {
    console.log(error.message)
})
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected to database!')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

//connect redis
//client.set('foo', 'ghost')
// client.connect();
// client.PING((err, ping) => {
//     console.log(ping)
// })

//set view
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'Views'))
//Router
app.use('/auth', AuthRouter)
app.use('/me', UserRouter)
app.use('/posts', PostRouter)
app.use('/', HomeRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})