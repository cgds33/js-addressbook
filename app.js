// app's main file

"use strict"; 

var fs = require('fs');

const express = require('express');
const path = require('path');
const app = express();
var apiRouter = require('./app_server/routers/api_router');
var pages = require('./app_server/routers/html_router');

// DB model
var db = require('./app_server/models/db') // #####

// Static folder
app.use('/public',express.static(path.join(__dirname,'app_server/public')));

// Mongoose connection
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/exampleInc';
mongoose.connect(mongoDB)


// Session connection
const session = require('express-session');

// Connect to mongo for save session
const MongoStore = require('connect-mongo')(session);

// Session
app.set('trust proxy', 1)
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Session object for templates
app.use(function(req, res, next) {
	res.locals.user = req.session.user;
	next();
});

// Flash Message Middleware
app.use((req,res,next) => {
	res.locals.sessionFlash = req.session.sessionFlash
	delete req.session.sessionFlash
	next()
} )

// Body parser for post requests
const bodyParser = require('body-parser')

const ejsLayouts = require('express-ejs-layouts')

// Logger middleware
app.use(function(req,res,next){
    console.log('Logger: '+ req.method + " " + req.url + " " + req.ip );
    next();
});

// Request body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// layouts
app.use(ejsLayouts);

// Views engine
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/app_server/views'));


// Api service
app.use('/api', apiRouter);

// Html pages
app.use('/', pages);

// ### debugger: True ###
app.listen(8000);