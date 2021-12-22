const mongoose = require('mongoose')
const Schema = mongoose.Schema

const certificateSchema = new Schema({
    universityID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University'
    },
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    uniqueID: {type: String, required: true, unique: true},
    full_name:{type: String, required: true,trim:true},
    email_address:{type: String, required: true, unique: true, lowercase: true,trim:true},
    email_address_personal:{type: String, required: true, unique: true, lowercase: true,trim:true,default: 'ugc_student013@yopmail.com'},
    student_id:{type: String, required: true, unique: true},
    credit:{type: String, required: true},
    courses:{type: String, required: true,trim:true},
    university_name:{type: String, required: true,trim:true},
    major: {type: String, required: true},
    minor:{type: String, required: true},
    cgpa: {type: String, required: true},
    dob: {type: Date, required: true},
    gender:{type: String, required: true},
    doa: {type: Date, required: true},
    dog:{type: Date, required: true},
    hash: {type: String, required: true},
    father_name:{type: String, required: true,trim:true,default:'not available'},
    mother_name:{type: String, required: true,trim:true,default:'not available'},
    isVerified: {type: String, default: 'not_verified'},
    deleteRequest: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
}, {timestamps: true})

module.exports = mongoose.model('Certificate', certificateSchema)