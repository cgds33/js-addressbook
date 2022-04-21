var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var addressSchema = new Schema({
    phone: {type:String,required:true},
    name_surname: {type:String,required:true, unique: true},
    email: {type:String, required:true},
    address: {type:String,required:true},
},
    { collection: 'address'}
);

var Address = mongoose.model('address',addressSchema);

module.exports = Address;

