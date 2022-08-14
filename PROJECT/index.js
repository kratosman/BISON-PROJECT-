const express = require('express'),
app = express(),
path= require('path'),
mongoose = require('mongoose'),
UserRoutes = require('./routes/UserRoutes'),
PostRoutes = require('./routes/Post'),
session = require('express-session'),
MongoStore = require('connect-mongo'),
MongoUri = 'mongodb://localhost:27017/bisonTest'

mongoose.connect(MongoUri, {
    useUnifiedTopology: true, 
    useNewUrlParser: true
})
    .then(() => {
        app.listen(3002, () => {
            console.log('App is listening to http://localhost:3002')
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
