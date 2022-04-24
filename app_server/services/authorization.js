
// This modules for session/login/request/logout processes
const express = require('express');
const context = require('bluebird/js/release/context');
const session = require('express-session');
var User = require('../models/users');


// POST method for login process
module.exports.loginPost = function(req,res){

    // If login information is blank
    if (!req.body.Email || !req.body.Password) {

        // Send error flask message
        req.session.sessionFlash = {
            type: 'alert alert-danger',
            message: 'Fill in the blanks!'
        }
        res.redirect('login');

    } else {

        var loginUser = User.find({email:req.body.Email},function(err,docs){
            if (err){

                // Send error flask message
                req.session.sessionFlash = {
                    type: 'alert alert-danger',
                    message: 'Something went wrong!'
                }
                res.redirect('login');
                    }

            else {

                // If mongoose res not empity:
                if (docs.length > 0) {
                    
                    if (docs[0]['password'] === req.body.Password) {
                        
                        // Create login session 
                        req.session.userId = docs[0]._id.toString() // MongoDB person ID
                        req.session.cookie.expires = new Date(Date.now() + 3600000);
                        req.session.loggedin = true;
                        req.session.user = req.body.Email;
    
                        req.session.save((err) => {
                            console.log(req.session);
                        });
                        
                        // Login process is successful, return index with flash message
                        req.session.sessionFlash = {
                            type: 'alert alert-success',
                            message: 'Successfully logged in!'
                        }

                        res.redirect('/');
                    }
                    else {
                        
                        // Wrong password flash messages, return again login page
                        req.session.sessionFlash = {
                            type: 'alert alert-danger',
                            message: 'Wrong Password!'
                        }
                        res.redirect('login');
                    }
                }
                else {
                    // Wrong login informations flash messages, return again login page
                    req.session.sessionFlash = {
                        type: 'alert alert-danger',
                        message: 'Wrong E-mail and Password!'
                    }
                    res.redirect('login');
                }
            }
        });   
    }
};



module.exports.registerPost = function(req,res){
  
    // ### verify all information ###
    if (!req.body.Name || !req.body.Surname || !req.body.Email || !req.body.Password || !req.body.PhoneNumber) {

        req.session.sessionFlash = {
            type: 'alert alert-danger',
            message: 'Fill in the blanks!'
        }
        res.redirect('register');
    }
    else if (req.body.Password !== req.body.PasswordVerify) {

        req.session.sessionFlash = {
            type: 'alert alert-danger',
            message: 'Passwords do not match!'
        }
        res.redirect('register');

    } else {

        var newUser = new User({
            name: req.body.Name,
            surname: req.body.Surname,
            email: req.body.Email,
            password: req.body.Password,
            phone: req.body.PhoneNumber
        })

        newUser.save(function(err){
            if (err) {

                req.session.sessionFlash = {
                    type: 'alert alert-danger',
                    message: 'This email address is not available!'
                }
                res.redirect('register');

            } else {

                req.session.sessionFlash = {
                    type: 'alert alert-success',
                    message: 'Account created successfully!'
                }
                res.redirect('/');
            }
        });
    }
};


// GET method for logout process
module.exports.logout = function(req,res){
    if (req.session) {
        // delete session object
        req.session.destroy(function (err,doc) {
            if (!err) {
                res.redirect('/');
            } else {
                // Something went wrong!
                res.redirect('/');
            }
        });
    }
};
