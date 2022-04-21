var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var mongoDB = 'mongodb://localhost/exampleInc';

/*
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
db.model()
*/

mongoose.connect(mongoDB,function(err,req){
    if(err){
        console.log('mongoose error: ' + err + req);
    }
    else {
        console.log('mongoose connected: '+ mongoDB)
    }
});
