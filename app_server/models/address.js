var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var addressSchema = new Schema({
    userId: {type:String,required:true},
    phone: {type:String,required:true},
    workPhone: {type:String,required:false},
    name_surname: {type:String,required:true},
    email: {type:String, required:true},
    workEmail: {type:String, required:false},
    address: {type:String,required:true},
    city: {type:String,required:false},
    companyName: {type:String,required:false}
},
    { collection: 'address'}
);

var Address = mongoose.model('address',addressSchema);

module.exports = Address;

