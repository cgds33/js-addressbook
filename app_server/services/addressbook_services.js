// address book service URL's

"use strict";
var path = require('path');

module.exports.addressbook = function(req,res){
    res.render('addressbook'); //{ message: 'This is address book'}
};

module.exports.addAddress = function(req,res){
    res.render('add_address');
};

module.exports.addAddressPost = function(req,res){
    console.log(req.body);
    res.render('addressbook');
};
