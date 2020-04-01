const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FieldSchema = mongoose.Schema({

    
    col: {
        type: Schema.Types.ObjectId,
        ref:'Collection'
        
    },
    title: {
        type:String,
        maxlength: 50
    },
    type: {
        type:String,
        maxlength: 50
        
    },
    value:{
        type:String,
        maxlength: 50
    }
    
    
})



const Field = mongoose.model('Field', FieldSchema);

module.exports = { Field }