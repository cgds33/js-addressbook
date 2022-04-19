
// HTML pages for GET request

"use strict";
var path = require('path');

module.exports.index = function(req,res){
    res.render('index');
};

module.exports.apiPage = function(req,res){
    res.render('api_page');
};

module.exports.whyus = function(req,res){
    res.render('whyus'); //{ message: 'This is why us'}
};

module.exports.login = function(req,res){
    res.render('login'); 
};

module.exports.register = function(req,res){
    res.render('register'); 
};