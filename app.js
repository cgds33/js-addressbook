// app's main folder

"use strict"; 

var fs = require('fs');

var express = require('express');
var path = require('path');
var app = express();
var apiRouter = require('./app_server/routers/api_router');
var pages = require('./app_server/routers/html_router');

// mongoose connection
var mongoose = require('mongoose')
var mongoDB = 'mongodb://localhost/exampleInc';
mongoose.connect(mongoDB)

// body parser for post requests
var bodyParser = require('body-parser')
var ejsLayouts = require('express-ejs-layouts')

// session connection
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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
    next();
});

// api service
app.use('/api', apiRouter);

// html pages
app.use('/', pages);

// ### debugger: True ###
app.listen(8000);