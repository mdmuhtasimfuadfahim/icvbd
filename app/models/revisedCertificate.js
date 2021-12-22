const mongoose = require('mongoose')
const Schema = mongoose.Schema

const revisedCertificateSchema = new Schema({
    certificateID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate',
        required: true
    },
    uniqueID: {type: String},
    full_name: {type: String,trim:true},
    email_address: {type: String, lowercase: true, trim:true},
    student_id: {type: String},
    credit: {type: String},
    courses: {type: String, trim:true},
    university_name: {type: String, trim:true},
    major: {type: String},
    minor:{type: String},
    cgpa: {type: String},
    dob: {type: Date},
    gender:{type: String},
    doa: {type: Date},
    dog:{type: Date},
    hash: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},{timestamps: true})


module.exports = mongoose.model('RevisedCertificate', revisedCertificateSchema)