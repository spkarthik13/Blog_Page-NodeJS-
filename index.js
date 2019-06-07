require('dotenv').config()

const express = require('express')
const path = require('path')

const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const cloudinary = require('cloudinary')

const app = new express() //server object
const edge = require('edge.js')
mongoose.connect(process.env.DB_URI)
app.use(fileUpload())
const Post = require('./database/models/Post')

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require ('./controllers/loginUser')
const logoutController = require ('./controllers/logout')

const validateCreatePostMiddleware = require('./Middleware/storePost')

const redirectIfAuthenticated = require('./Middleware/redirectIfAuthenticated')

const auth = require('./Middleware/auth')

const expressEdge = require('express-edge')// templating engine

const mongoStore = connectMongo(expressSession)

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,

})

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })

}))

app.use(connectFlash())

app.use(express.static('public')) //assets for the page

app.use(expressEdge)

app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use('*', (req, res, next)=>{
    edge.global('auth', req.session.userId)
    next()
})

app.get('/', homePageController)

app.get('/post/:id', getPostController)

app.get('/posts/new', auth, createPostController)

app.post('/posts/store', auth, validateCreatePostMiddleware, storePostController)

app.post('/users/register', redirectIfAuthenticated, storeUserController)

app.post('/users/login', redirectIfAuthenticated, loginUserController)

app.get('/auth/register', redirectIfAuthenticated, createUserController)

app.get('/auth/login', redirectIfAuthenticated, loginController)

app.get('/auth/logout', auth, logoutController)

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/contact', (req, res)=>{
    res.render('contact')
})

//testing nodemon
app.listen(process.env.PORT, ()=>{
    console.log(`App listening on port ${process.env.PORT}`)
})


