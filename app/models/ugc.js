const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ugcSchema = new Schema({
    uniqueID: {type: String, required: true, unique: true},
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
    role:{type: String, default: 'UGC'},
    hash: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},{timestamps: true})

module.exports = mongoose.model('UGC', ugcSchema)