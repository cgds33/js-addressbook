
// API services processed here

"use strict";
const path = require('path');
var User = require('../models/users');
var Address = require('../models/address');


// API POST request
// Add new address on database
// Name, address, and phone fields are required
module.exports.addAddress = function(req,res){

    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }

            // Does this user exist?
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

                // if the address informations is here, continue process
                else {

                    // Is this address registered?
                    var isRegistered = Address.find({userId: docs[0]._id.toString(), name_surname: req.body['info']['name_surname']},function(err,addressDocs){
                        if (err){
                            var answer = {answer:"error",msg:"user error"};
                            res.end(JSON.stringify(answer));
                        }
                        else {
                            if (addressDocs.length > 0){
                                // this address is already exist
                                let answer = {answer:"error",msg:"there address is already exist"};
                                res.end(JSON.stringify(answer));
                            }
                            else {

                                // Address object
                                var addressInfo = {
                                    userId: docs[0]._id.toString(),
                                    name_surname: req.body['info']['name_surname'],
                                    address: req.body['info']['address'],
                                    phone: req.body['info']['phone']
                                }
                                
                                // Save additional information on  address object
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

                                // Save this
                                var newAddress = new Address(addressInfo);
                                newAddress.save();

                                // Return success response
                                let answer = {answer:"success",msg:"data saved"};
                                res.end(JSON.stringify(answer));
                            }
                        }
                    })
                }

            } else {
                var answer = {answer:"error", msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}


// API GET request
// Fetch address by address name
module.exports.fetchByName = function(req,res) {
    
    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }

            // Does this user exist?
            else if (docs.length > 0){

                if (!req.body['info']['name_surname']){
                    let answer = {answer:"error",msg:"there is not name data"};
                    return res.end(JSON.stringify(answer));
                }

                // if the address informations is here, continue process
                else {

                    // Is this address registered?
                    var isRegistered = Address.find({userId: docs[0]._id.toString(), name_surname: req.body['info']['name_surname']},function(err,addressDocs){
                        if (err){
                            var answer = {answer:"error",msg:"user error"};
                            res.end(JSON.stringify(answer));
                        }
                        else {
                            if (addressDocs.length > 0){
                                // Address found
                                let answer = {answer:"success",msg:addressDocs[0]};
                                res.end(JSON.stringify(answer));
                            }
                            else {
                                // Return success response
                                let answer = {answer:"error",msg:"address not found"};
                                res.end(JSON.stringify(answer));
                            }
                        }
                    })
                }

            } else {
                var answer = {answer:"error", msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}


// API GET request
// Fetch address by address email
module.exports.fetchByEmail = function(req,res) {
    
    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }

            // Does this user exist?
            else if (docs.length > 0){

                if (!req.body['info']['email']){
                    let answer = {answer:"error",msg:"there is not email data"};
                    return res.end(JSON.stringify(answer));
                }

                // if the address informations is here, continue process
                else {

                    // Is this address registered?
                    var isRegistered = Address.find({userId: docs[0]._id.toString(), email: req.body['info']['email']},function(err,addressDocs){
                        if (err){
                            var answer = {answer:"error",msg:"user error"};
                            res.end(JSON.stringify(answer));
                        }
                        else {
                            if (addressDocs.length > 0){
                                // Address found
                                let answer = {answer:"success",msg:addressDocs[0]};
                                res.end(JSON.stringify(answer));
                            }
                            else {
                                // Return success response
                                let answer = {answer:"error",msg:"address not found"};
                                res.end(JSON.stringify(answer));
                            }
                        }
                    })
                }

            } else {
                var answer = {answer:"error", msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}


// API GET request
// Fetch address by address phone number
module.exports.fetchByPhone = function(req,res) {
    
    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }

            // Does this user exist?
            else if (docs.length > 0){

                if (!req.body['info']['phone']){
                    let answer = {answer:"error",msg:"there is not phone data"};
                    return res.end(JSON.stringify(answer));
                }

                // if the address informations is here, continue process
                else {

                    // Is this address registered?
                    var isRegistered = Address.find({userId: docs[0]._id.toString(), phone: req.body['info']['phone']},function(err,addressDocs){
                        if (err){
                            var answer = {answer:"error",msg:"user error"};
                            res.end(JSON.stringify(answer));
                        }
                        else {
                            if (addressDocs.length > 0){
                                // Address found
                                let answer = {answer:"success",msg:addressDocs[0]};
                                res.end(JSON.stringify(answer));
                            }
                            else {
                                // Return success response
                                let answer = {answer:"error",msg:"address not found"};
                                res.end(JSON.stringify(answer));
                            }
                        }
                    })
                }

            } else {
                var answer = {answer:"error", msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}


// API GET request
// Fetch all addresses 
module.exports.fetchAll = function(req,res) {
    
    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }

            // Does this user exist?
            else if (docs.length > 0){

                // Is this address registered?
                var isRegistered = Address.find({userId: docs[0]._id.toString()},function(err,addressDocs){
                    if (err){
                        var answer = {answer:"error",msg:"user error"};
                        res.end(JSON.stringify(answer));
                    }
                    else {
                        if (addressDocs.length > 0){

                            // Address found
                            let answer = {answer:"success",msg:addressDocs};
                            res.end(JSON.stringify(answer));
                        }
                        else {
                            // Return success response
                            let answer = {answer:"error",msg:"address book is empity"};
                            res.end(JSON.stringify(answer));
                        }
                    }
                })

            } else {
                var answer = {answer:"error", msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}


// API DELETE request
// Fetch all addresses 
module.exports.deleteByName = function(req,res) {
    
    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }

            // Does this user exist?
            else if (docs.length > 0){

                if (!req.body['info']['name_surname']){
                    let answer = {answer:"error",msg:"there is not name data"};
                    return res.end(JSON.stringify(answer));
                }

                // if the address informations is here, continue process
                else {

                    // Delete address if not exist
                    var deleteAddress = Address.deleteOne({userId: docs[0]._id.toString(), name_surname: req.body['info']['name_surname']},function(err,delDocs){
                        if (err){
                            var answer = {answer:"error",msg:"user error"};
                            res.end(JSON.stringify(answer));
                        }
                        else {
                            
                            if (delDocs['deletedCount'] > 0){
                                // if deleted
                                var answer = {answer:"success",msg:"address was deleted"};
                                res.end(JSON.stringify(answer));
                            } else {
                                // if not deleted
                                var answer = {answer:"error",msg:"address not found"};
                                res.end(JSON.stringify(answer));
                                }
                            }
                        })                
                }
            } else {
                var answer = {answer:"error", msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}


// API PATCH request
module.exports.updateAddress = function(req,res){

    if (req.body['user']){
        var userEmail = req.body['user']['userEmail']
        var userPassword = req.body['user']['userPassword']

        // Get user info on mongoDB
        var loginUser = User.find({email:userEmail,password:userPassword},function(err,docs){
            if (err){
                var answer = {answer:"error",msg:"user error"};
                res.end(JSON.stringify(answer));
            }
            // Does this user exist?
            else if (docs.length > 0){

                if (!req.body['info']['name_surname']){
                    let answer = {answer:"error",msg:"there is not query name data"};
                    return res.end(JSON.stringify(answer));
                }
                if (!req.body['update']){
                    let answer = {answer:"error",msg:"there is not update data"};
                    return res.end(JSON.stringify(answer));
                }
                
                // if the address informations is here, continue process
                else {

                    // Is this address registered?
                    var isRegistered = Address.find({userId: docs[0]._id.toString(), name_surname: req.body['info']['name_surname']},function(err,updateDocs){
                        if (err){
                            var answer = {answer:"error",msg:"user error"};
                            res.end(JSON.stringify(answer));
                        }
                        else {
                            if (updateDocs.length > 0){

                                var updateDict = {}

                                if (req.body['update']['name_surname']){
                                    updateDict['name_surname'] = req.body['update']['name_surname']
                                }
                                if (req.body['update']['address']){
                                    updateDict['address'] = req.body['update']['address']
                                }
                                if (req.body['update']['phone']){
                                    updateDict['phone'] = req.body['update']['phone']
                                }
                                if (req.body['update']['workPhone']){
                                    updateDict['workPhone'] = req.body['update']['workPhone']
                                }
                                if (req.body['update']['email']){
                                    updateDict['email'] = req.body['update']['email']
                                }
                                if (req.body['update']['workEmail']){
                                    updateDict['workEmail'] = req.body['update']['workEmail']
                                }
                                if (req.body['update']['companyName']){
                                    updateDict['companyName'] = req.body['update']['companyName']
                                }

                                var query = {userId: docs[0]._id.toString()}
                                var updateAddress = Address.updateOne(query,updateDict,function(err,updateRes){
                                    if (err){
                                        var answer = {answer:"error",msg:"update error"};
                                        res.end(JSON.stringify(answer));
                                    }
                                    else {
                                        // this address is already exist
                                        let answer = {answer:"success",msg:"successful update"};
                                        res.end(JSON.stringify(answer));
                                    }
                                })
                            }
                            else {

                                // Return success response
                                let answer = {answer:"error",msg:"there is no address with such a this name"};
                                res.end(JSON.stringify(answer));
                            }
                        }
                    })
                }

            } else {
                var answer = {answer:"error", msg:"wrong userEmail or userPassword"};
                res.end(JSON.stringify(answer));
            }
        })
    }
    else {
        var answer = {answer:"error",msg:"user error"};
        res.end(JSON.stringify(answer));
    }
}
