const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { auth } = require("../middleware/auth");
const { authforlikes } = require("../middleware/authforlikes")




router.post("/GetLike", authforlikes, (req, res) => {

    
    const itemId = req.query.itemId
    Like.find({ itemId: itemId })
        .exec((err, likes) => {
            if (err) return res.status(400).json({ success: false, err })
            if (req.user) {
                const userId = req.user._id
            
                return res.status(200).json({ success: true, likes, userId })
            } else {
                return res.status(200).json({ success: true, likes })
            }
        })


});
router.post("/upLike", auth, (req, res) => {
    const userId = req.user._id
    const itemId = req.query.itemId
    const like = new Like({ itemId: itemId, userId: userId })
    like.save((err) => {
        if (err) return res.json({ succes: false, err })
        res.status(200).json({ success: true })
    })




});
router.post("/unLike", auth, (req, res) => {


    const userId = req.user._id
    const itemId = req.query.itemId
    Like.findOneAndDelete({ itemId: itemId, userId: userId })
        .exec((err) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })





});




module.exports = router;