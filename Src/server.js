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
const logger = require('morgan')



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

//connect database
db.connect()

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