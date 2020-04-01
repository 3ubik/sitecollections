const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LikeSchema = mongoose.Schema({


    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'        
    },


    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Items'
    },
  
    
    
    
    
})



const Like = mongoose.model('Like', LikeSchema);

module.exports = { Like }