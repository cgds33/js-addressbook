
// API services processed here

"use strict";
const path = require('path');
var User = require('../models/users');
var Address = require('../models/address');

module.exports.addUser = function(req,res){

    // API POST request
    // Name, address, and phone fields are required
    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }
            else if (docs.length > 0){
                if (!req.body['info']['name_surname']){
                    let answer = {answer:"error",msg:"there is not name data"};
                    return res.end(JSON.stringify(answer));
                }
                else if (!req.body['info']['address']){
                    let answer = {answer:"error",msg:"there is not address data"};
                    return res.end(JSON.stringify(answer));
                }
                else if (!req.body['info']['phone']){
                    let answer = {answer:"error",msg:"there is not phone number data"};
                    return res.end(JSON.stringify(answer));
                }
                else {

                    var addressInfo = {
                        userId: docs[0]._id.toString(),
                        name_surname: req.body['info']['name_surname'],
                        address: req.body['info']['address'],
                        phone: req.body['info']['phone']
                    }

                    if (req.body['info']['workPhone']){
                        addressInfo['workPhone'] = req.body['info']['workPhone']
                    }
                    if (req.body['info']['email']){
                        addressInfo['email'] = req.body['info']['email']
                    }
                    if (req.body['info']['workEmail']){
                        addressInfo['workEmail'] = req.body['info']['workEmail']
                    }
                    if (req.body['info']['companyName']){
                        addressInfo['companyName'] = req.body['info']['companyName']
                    }

                    console.log(addressInfo)

                    //  save this
                    let answer = {answer:"success",msg:"data saved"};
                    res.end(JSON.stringify(answer));
                }
            } else {
                var answer = {answer:"error",msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}

