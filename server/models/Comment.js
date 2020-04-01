const mongoose = require('mongoose');
const Schema = mongoose.Schema


const commentSchema = mongoose.Schema({
    message: {
        type:String,
        
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Items'
    },
    sender: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    type:{
        type:String
    },
},{timestamps: true})
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }