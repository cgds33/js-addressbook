// app's main file

"use strict"; 

var fs = require('fs');

const express = require('express');
const path = require('path');
const app = express();
var apiRouter = require('./app_server/routers/api_router');
var pages = require('./app_server/routers/html_router');

var db = require('./app_server/models/db') // #####

// mongoose connection
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost/exampleInc';
mongoose.connect(mongoDB)


// session connection
const session = require('express-session');

// connect to mongo for save session
const MongoStore = require('connect-mongo')(session);

app.set('trust proxy', 1)
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// body parser for post requests
const bodyParser = require('body-parser')
const ejsLayouts = require('express-ejs-layouts')




// views engine
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/app_server/views'));

// request body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(ejsLayouts);

// static folder
app.use('/public',express.static(path.join(__dirname,'app_server/public')));

// logger middleware
app.use(function(req,res,next){
    console.log('Logger: '+ req.method + " " + req.url + " " + req.ip );
	console.log(req.session.user, req.session.db_id) // #######
	console.log(req.session)
    next();
});

// api service
app.use('/api', apiRouter);

// html pages
app.use('/', pages);

// ### debugger: True ###
app.listen(8000);