var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var mongoDB = 'mongodb://localhost/exampleInc';

/*
mongoose.connect(mongoDB,function(err,err){
    if(err){
        console.log('mongoose error: ' + err);
    }
    else {
        console.log('mongoose connected: '+ mongoDB)
    }
})*/

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});