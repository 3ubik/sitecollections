const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = mongoose.Schema({


    name: {

        type: String,
        maxlength: 50
    },
    tag: {
        type: String
    },
    collect: {
        type: Schema.Types.ObjectId,
        ref: 'Collection'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
        
    },

    fields: {

        type: Array,
        default: []

    },
    comments: {
        type: String
    },
    likes: {
        type: Number
    }




},{timestamps: true})



const Items = mongoose.model('Item', ItemSchema);

module.exports = { Items }