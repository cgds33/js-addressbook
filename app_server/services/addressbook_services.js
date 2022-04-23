// address book service URL's

"use strict";
const session = require('express-session');
var path = require('path');
var Address = require('../models/address');

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
    if (!req.body.PhoneNumber || !req.body.NameSurname || !req.body.Email || !req.body.Address) {

        req.session.sessionFlash = {
            type: 'alert alert-danger',
            message: 'Fill in the blanks!'
        }
        res.redirect('add_address');

    } else {

        var newAddress = new Address({
            userId: req.session.userId,
            phone: req.body.PhoneNumber,
            name_surname: req.body.NameSurname,
            email: req.body.Email,
            address: req.body.Address,
            city: req.body.City
    
        })

        newAddress.save();
    
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'New address successfully registered!'
        }
    
        res.redirect('addressbook');

    }
};
