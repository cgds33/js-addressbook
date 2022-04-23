
// This modules for session/login/request/logout processes
const express = require('express');
const context = require('bluebird/js/release/context');
const session = require('express-session');
var User = require('../models/users');


module.exports.loginPost = function(req,res){

    console.log(req.body);
    var loginUser = User.find({email:req.body.Email},function(err,docs){
        if (err){
            console.log(err)
        }
        else {

            console.log("login: ", docs[0]['email'])
            if (docs != []) {

                if (docs[0]['password'] === req.body.Password) {

                    req.session.userId = docs[0]._id.toString()
                    req.session.cookie.expires = new Date(Date.now() + 3600000);
                    req.session.loggedin = true;
                    req.session.user = req.body.Email;

                    req.session.save((err) => {
                        console.log(req.session);
                    });

                    console.log("login successfull")
                    console.log(docs[0]._id.toString())

                    res.redirect('/');
                }
                else {
                    console.log("wrong pass")
                    res.redirect('login');
                }
            }
            else {
                console.log("wrong email and password")
                res.redirect('login');
            }
        }
    });
    
    //res.redirect('login');
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
        res.redirect('/');
    } 
    else {
        // #### send error message ####
        res.redirect('register');
    }
};