
require('dotenv').config()

const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const Emitter = require('events')
const morgan = require('morgan')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require("cookie-parser"); //new edit 
const MongoDbStore = require('connect-mongo')
const url = require('url')


/*----------------define port number-----------------*/ 
const PORT = process.env.PORT || 3500

/*----------
log requests
-----------*/
app.use(morgan('tiny'))


/*-----------------
database connection
------------------*/ 
const connectDB = require('./app/config/dbConnection')
connectDB()


/*-----------
event emitter
------------*/
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


/*-----------
session store
------------*/ 
const mongodbstore = new MongoDbStore({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
    dbName: "verifyCertificate",
    stringify: false
})


/*------------
session config
-------------*/ 
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    //store: mongodbstore,
    saveUninitialized: true,
    //rolling: false,
    cookie: { maxAge: 1000 * 60 * 60 * 5} /*----- 5 hours-------*/
}))

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());




/*---------------
use express flash
----------------*/ 
app.use(flash())


/*-----
assets
-----*/
app.use(express.static('public'))
//app.use(express.urlencoded({ extended: false}))
app.use(express.json())





/*----------------
golbal  middleware 
----------------*/ 



/*------------------
set template engine
------------------*/
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')



/*-------------
routing control
--------------*/ 
require('./routes/web')(app)


const server = app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})



