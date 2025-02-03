const mongoose = require('mongoose');
const { Schema } = mongoose;

const registerSchema = new Schema({
    firstName: { type: String, required: true},
    middleName: { type: String, required: true},
    lastName: { type: String, required: true},
    gender: { type: String, required: true},  
    email:{type:String,required:true},
    password: { type: String, required: true},
    phone: { type: String, required: true},
    dob: { type: String, required: true},
    address: { type: String, required: true },
});

module.exports = mongoose.model('Register', registerSchema);
