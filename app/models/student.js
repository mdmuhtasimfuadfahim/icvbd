const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    uniqueID: {type: String, required: true, unique: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    fatherName:{type: String, required: true},
    mohterName:{type: String, required: true},
    dob:{type: Date, required: true},
    uniName:{type: String, required: true},
    studentEmail:{type: String, required: true, unique: true, lowercase: true},
    studentID: {type: String, required: true, unique: true},
    phone:{type: String, required: true, unique: true},
    address:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String, default: 'Student'},
    registrationStatus: {type: String, default: 'not_approved'},
    hash: {type: String, required: true},
    inVerified: {type: String, default: 'not_verified'}, 
    certificateRequest : {type: String, default: 'yes'},   // need to changed to 'no' when a certificate is in making. Other states are 'processing', 'completed'
    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},{timestamps: true})

module.exports = mongoose.model('Student', studentSchema)