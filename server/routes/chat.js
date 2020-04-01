const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");


router.get("/getChats", (req, res) => {
    Comment.find({itemId:req.query.itemId})
       .populate("sender")
       .exec((err,chats)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(chats)
       })

});
module.exports = router