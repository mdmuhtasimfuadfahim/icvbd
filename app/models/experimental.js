const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expSchema = new Schema({
    field1: {type: String},
    field2:{type: String}
    
},{timestamps: true})

module.exports = mongoose.model('EXP', expSchema)