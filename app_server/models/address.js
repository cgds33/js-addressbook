var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var addressSchema = new Schema({
    userId: {type:String,required:true},
    phone: {type:String,required:true},
    workPhone: {type:String,required:true},
    name_surname: {type:String,required:true, unique: true},
    email: {type:String, required:true},
    workEmail: {type:String, required:true},
    address: {type:String,required:true},
    companyName: {type:String,required:true},
},
    { collection: 'address'}
);

var Address = mongoose.model('address',addressSchema);

module.exports = Address;

