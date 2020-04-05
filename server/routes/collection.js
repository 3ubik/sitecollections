const express = require('express');
const router = express.Router();
const { Collection } = require("../models/Collection");
const { Field } = require("../models/Field");
const { Items } = require("../models/Items");
const {Like} = require("../models/Like")

const { auth } = require("../middleware/auth");


router.post("/uploadCollection", auth, (req, res) => {

    const collection = new Collection(req.body)

    collection.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.get("/getCollections", auth, (req, res) => {
    if (req.user._id != req.query.id && req.user.role != 1){
        return res.status(200).json({
            success: false,
            message: "You cannot get acces to this page, sorry"
        })
    }    
    Collection.find({ writer : req.query.id })
        .exec((err, collections) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, collections })
        })

});

router.get("/collection_by_id", (req, res) => {


    let collectionIds = req.query.id
    Collection.find({ '_id': { $in: collectionIds } })
        .populate('writer')
        .exec((err, collection) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send({ success: true, collection, writer: collection[0].writer })
        })
});

router.delete("/collection_by_id", (req, res) => {

    let collectionIds = req.query.id
    Field.deleteMany({ col: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })

    })
    Like.deleteMany({ collectionOfLike: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
    });
    Items.deleteMany({ collect: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })

    })
    Collection.findOneAndDelete({ _id: collectionIds }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});
router.delete("/item_by_id", (req, res) => {
    req.query.itemlenght--
    
    Collection.updateOne({ _id: req.query.collectionId }, { $set: { items: req.query.itemlenght } }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })

    })
    Like.deleteMany({ itemId: req.query.id })
    .exec((err, r) => { if (err) return res.status(400).json({ success: false, err }) })
    
    Items.findOneAndDelete({ _id: req.query.id })
        .exec((err, r) => {
            if (err) return res.status(400).json({ success: false, err })
            if (r) {
                Items.find({ collect: r.collect })
                    .exec((err, items) => {
                        if (err) return res.status(400).json({ success: false, err })
                        return res.status(200).json({ success: true, items })
                    })
            }
        }
        )
    


});
router.put("/collection_by_id", (req, res) => {
    const newcol = req.body
    let collectionIds = req.query.id

    Collection.updateOne({ _id: collectionIds }, { $set: { title: newcol.title, topic: newcol.topic, description: newcol.description, images: newcol.images } }, function (err, result) {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })


});


router.put("/upDatefield", (req, res) => {
    let collectionIds = req.query.id
    Field.updateOne({ col: collectionIds, title: req.body.title }, { $set: { value: req.body.value } })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
        })

    Field.find({ col: collectionIds })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, fields: fields })
        })
});


router.post("/collection_by_id", (req, res) => {



    const Name = req.body.title
    const collectionId = req.body.col
    Field.find({ col: collectionId, title: Name })
        .exec((err, field) => {
            if (err) return res.status(400).json({ success: false, err })
            if (field.length == 0) {
                const field = new Field(req.body)
                field.save((err) => {
                    if (err) returnres.status(400).json({ success: false, err })
                    return res.status(200).json({ success: true })
                })


            }
            else {
                const mes = "Field with this name exists "
                return res.status(200).json({ success: false, mes })
            }


        })




});
router.post("/Additem", (req, res) => {
    var items = req.query.items
    items++
    Collection.updateOne({ _id: req.body.collect }, { $set: { items: items } })
        .exec((err, fields) => {

            if (err) return res.status(400).json({ success: false, err })
        })
    const item = new Items(req.body)
    item.save((err) => {
        if (err) returnres.status(400).json({ success: false, err })
        Field.updateMany({ col: req.body.collect }, { $set: { value: req.body.fields.value } })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })
        
    })
    
});

router.get("/fields_by_id", (req, res) => {
    let collectionIds = req.query.id

    Field.find({ col: collectionIds })
        .exec((err, fields) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, fields })
        })
});

router.get("/items", auth, (req, res) => {
    Items.find({ collect: req.query.id })
        .exec((err, items) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, items })
        }
        )
});

router.get("/itemsid", auth, (req, res) => {
    Items.find({ _id: req.query.id })
        .exec((err, items) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, items })
        }
        )
});

router.put("/ItemupDatefield", auth, (req, res) => {
    Items.find({ _id: req.query.id })
        .exec((err, items) => {
            if (err) return res.status(400).json({ success: false, err })
            if (items) {
                items[0].fields[req.query.i].value = req.query.value
                Items.updateOne({ _id: req.query.id }, { $set: { fields: items[0].fields } })
                    .exec((err, e) => {
                        if (err) return res.status(400).json({ success: false, err })
                        return res.status(200).json({ success: true })
                    })
            }
        }
        )
});
router.post("/ItemupDatefield", auth, (req, res) => {
   
        Items.updateOne({ _id: req.query.id }, { $set: { name: req.query.name, tag: req.query.tag } })
        .exec((err, e) => {
            if (err) return res.status(400).json({ success: false, err })
            Items.find({ collect: req.query.col })
                .exec((err, items) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).json({ success: true, items })
                })
        })
});
router.post("/latestitems", (req, res) => {
    Items.find()
        .exec((err, items) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, items })
        })
});
router.post("/getAllCollections", (req, res) => {
    Collection.find()
        .exec((err, collections) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, collections })
        })
});

module.exports = router;
