const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = mongoose.Schema({    
    writer: {
        type: Schema.Types.ObjectId,
        ref:'User'        
    },
    title: {
        type:String,
        maxlength: 50
    },
    topic: {
        type: String,
        maxlength: 50
    },
    description: {
        type:String        
    },
    images : {
        type:Array        
    },    
    items: {
        type: Number,
        default: 0        
    },
    
})
const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = { Collection }