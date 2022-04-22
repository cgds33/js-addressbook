// address book service URL's

"use strict";
const session = require('express-session');
var path = require('path');

module.exports.addressbook = function(req,res){

    res.render('addressbook'); //{ message: 'This is address book'}
};

module.exports.addAddress = function(req,res){
    if(req.session.userId){
        return res.render('add_address');
    }
    res.redirect('login');
};

module.exports.addAddressPost = function(req,res){

    // ### add new adress ###
    console.log(req.body.Password,req.body.PasswordVerify)
    if (req.body.Password == req.body.PasswordVerify){
        var newAddress = new User({
            user_id: req.session.userId,
            phone: req.body.PhoneNumber,
            name_surname: req.body.NameSurname,
            email: req.body.Email,
            address: req.body.Address
        })
        newAddress.save();
    } 
    else {
        // #### send error message ####
    }
    console.log(req.body);
    res.render('addressbook');
};


module.exports.registerPost = function(req,res){
    
    // ### verify all information ###
    console.log(req.body.Password,req.body.PasswordVerify)
    if (req.body.Password == req.body.PasswordVerify){
        var newUser = new User({
            name: req.body.Name,
            surname: req.body.Surname,
            email: req.body.Email,
            password: req.body.Password,
            phone: req.body.PhoneNumber
        })

        newUser.save();
    } 
    else {
        // #### send error message ####
    }

    res.render('index'); 
};