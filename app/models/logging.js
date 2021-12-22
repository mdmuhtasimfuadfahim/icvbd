const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
    uniName: {type: String},
    logText:{type: String},
    officialType:{type: String}    
},{timestamps: true})

module.exports = mongoose.model('Logging', logSchema)