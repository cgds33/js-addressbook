
// This modules for session/login/request/logout processes

const context = require('bluebird/js/release/context');
var path = require('path');
var User = require('../models/users');

module.exports.loginPost = function(req,res){
    /*
    console.log(req.body);
    var loginUser = User.find({email:req.body.Email},function(err,docs){
        if (err){
            console.log(err)
        }
        else {

            console.log("login: ", docs[0]['email'])
            if (docs != []) {

                if (docs[0]['password'] === req.body.Password) {
                    req.session.loggedin = true;
                    req.session.username = Email;
                    console.log("login successfull")
                    //res.render('index');
                }
                else {
                    console.log("wrong pass")
                    //res.render('login');
                }
            }
            else {
                console.log("wrong email and password")
                //res.render('login');
            }
        }
    });
    // console.log(loginUser);*/
    res.render('login');
};

module.exports.registerPost = function(req,res){
    
    // ### verify all information ###
    if (req.body.Password == req.body.PasswordVerify){
        var newUser = new User({
            name: req.body.Name,
            surname: req.body.Surname,
            email: req.body.Email,
            password: req.body.Password,
            phone: req.body.PhoneNumber
        })

        newUser.save(function(err){

        });
    } 
    else {
        // #### send error message ####
        res.render('register'); 
    }

    res.render('index'); 
};