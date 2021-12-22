const mongoose = require('mongoose')
const Schema = mongoose.Schema

const faqSchema = new Schema({ 
    type: {type: String, default:'na'}, //to be utilized for faq categories
    language:{type: String, required: true,default:'English'}, //right now - English or Bengali
    question:{type: String, required: true,  lowercase: true,trim:true}, //question body
    answer:{type: String, required: true,  lowercase: true,trim:true}, //answer body
    created_by:{type: String, trim:true,default:'super-admin'},
    isVerified: {type: String, default: 'verified'}, //for future use of multi-admin UGC module
    deleteRequest: {type: String,default: 'no'},// yes or no 
    order: { type: Number} //question order
}, {timestamps: true})

module.exports = mongoose.model('FAQ', faqSchema)