const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otherSchema = new Schema({
    uniqueID: {type: String, required: true, unique: true},
    orgName:{type: String, required: true},
    typeOfOrg:{type: String, required: true},
    country:{type: String, required: true},
    state:{type: String, required: true},
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
    password:{type: String, required: true},
    role:{type: String, default: 'Other'},
    registrationStatus: {type: String, default: 'not_approved'}, //duita value 'approved' and 'not_approved'
    hash: {type: String, required: true},
    inVerified: {type: String, default: 'not_verified'},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},{timestamps: true})

module.exports = mongoose.model('Other', otherSchema)