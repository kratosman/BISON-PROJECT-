require('dotenv').config()
const express = require('express'),
app = express(),
path= require('path'),
mongoose = require('mongoose'),
UserRoutes = require('./routes/UserRoutes'),
PostRoutes = require('./routes/Post'),
session = require('express-session'),
MongoStore = require('connect-mongo'),
MongoUri = process.env.MONGODB_URL

mongoose.connect(MongoUri, {
    useUnifiedTopology: true, 
    useNewUrlParser: true
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('App is listening to http://localhost:'+process.env.PORT)
        })
    })

app.use(session({
    secret: "mingming",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: MongoUri,
      dbName: 'test-app' // See below for details
    })
  }));
//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./uploads'))
app.use(express.static(path.join(__dirname, './public')))
app.set(path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', UserRoutes)
app.use('/', PostRoutes)
