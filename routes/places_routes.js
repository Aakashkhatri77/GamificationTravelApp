const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const Places = require('../models/places_model')


router.post('/places/insert', upload.single('pimage'), 
function(req,res, next){
    const pimage = req.file;
    const pname = req.body.pname;
    if(req.file == undefined)
    {
        res.status(401).json({"success":false,"message":"Invalid File"})
    }
    else
    {
        const Placesdata = new Places({ pimage:pimage.filename, pname:pname})
        Placesdata.save()
        
        .then(function(result){
            res.status(201).json({message : "Places inserted!!", success: true, data: data})
        })
        .catch(function(e){
            res.status(500).json({error : e})
        })
    }
})

//Update
// id - updated data from user
router.put('/places/update/:id', function(req,res){
    // const dimage = req.body.dimage;
    const pname = req.body.pname;
    const id = req.params.id;
    // console.log("hello")
    Destination.updateOne({_id : id}, {
        // dimage : dimage,
        pname : pname,
    })
    .then (function(result){
        res.status(200).json({message : "Updated!!"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})


//Delete
router.delete('/places/delete/:id', function(req,res){
    const id = req.params.id;
    Places.deleteOne({_id : id})
    .then(function(result){
        res.status(200).json({message : "Deleted!!"})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})


router.get('/places/showall', function(req,res){
    Places.find()
    .then(function(data){
    //  console.log(data)
        res.status(200).json({success: true, data: data})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/places/single/:id', function(req,res){
    const id = req.params.id;
    Places.findOne({_id : id})
    .then(function(data){
        res.status(200).json(data)
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

module.exports = router;