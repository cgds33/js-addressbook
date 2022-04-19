var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: {type:String,required:true},
    surname: {type:String,required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String,required:true},
    phone: {type:String,required:true}
},
    { collection: 'users'}
);

var User = mongoose.model('users',usersSchema);

module.exports = User;

