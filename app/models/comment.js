const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    universityName: {
        type: String,
        required: true
    },
    posterType:{ //one who posts the comments. There are three options only. 'Maker' , 'Checker'& 'UGC'
        type: String,
        required: true
    },
    
    textBody:{
        type: String, 
        required: true,
        trim:true
    },
    recipient:{
        type: String, 
        required: true, 
        trim:true,

    },

    certificateID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate'
    },
    
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)