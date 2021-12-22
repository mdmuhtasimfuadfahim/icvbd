const mongoose = require('mongoose')
const Schema = mongoose.Schema

const universitySchema = new Schema({
    uniqueID: {type: String, required: true, unique: true},
    uniName:{type: String, required: true, unique: true},
    isRestricted:{type: String, required: true, default:'no'},
    UGCID:{type: String},
    district:{type: String, required: true},
    city:{type: String, required: true},
    zipcode:{type: String, required: true},
    phoneOne: {type: String, required: true, unique: true},
    phonetwo:{type: String, required: true, unique: true},
    phonethree:{type: String, unique: true},
    officialemail:{type: String, required: true, unique: true, lowercase: true},
    emailDomain:{type: String, required: true, unique: true},
    nameOne:{type: String, required: true},
    emailOne:{type: String, required: true, unique: true, lowercase: true},
    designationOne:{type: String, required: true},
    nameTwo:{type: String, required: true},
    emailTwo:{type: String, required: true, unique: true, lowercase: true},
    designationTwo:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String, default: 'University'},
    registrationStatus: {type: String, default: 'not_approved'},
    checkerPassword:{type: String, required: true},
    hash: {type: String, required: true},
    inVerified: {type: String, default: 'not_verified'},
    permission: {type: String, default: 'Yes'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},{timestamps: true})

module.exports = mongoose.model('University', universitySchema)