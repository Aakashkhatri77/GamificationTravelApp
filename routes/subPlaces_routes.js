const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const SubPlaces = require('../models/subPlaces_model')

router.post('/subplaces/insert', upload.single('SubPlaces_image'), function(req,res,next){
    console.log(req.file);
    const SubPlaces_image = req.file;
    const SubPlaces_name = req.body.SubPlaces_name;
    const SubPlaces_details = req.body.SubPlaces_details;
    const Places = req.body.Places;

    if(req.file == undefined)
    {
        res.status(401).json({"success":false,"message":"Invalid File"})
    }
    else
    {
        const SubPlacesdata = new SubPlaces({ 
            SubPlaces_image : SubPlaces_image.filename,
             SubPlaces_name : SubPlaces_name,
              SubPlaces_details : SubPlaces_details,
              Places : Places
            })
        SubPlacesdata.save()
        .then(function(result){

            res.status(201).json({message : "SubPlaces inserted!!", success: true, data: result})
        })
        .catch(function(e){
           console.log(e)
        })
    }
})

router.post('/subplaces/insery/:id', 
upload.single('SubPlaces_picture'), 
function(req,res,next){
    console.log(req.file);
    const id = req.params.id;
    const SubPlaces_image = req.file;

    if(req.file == undefined)
    {
        res.status(401).json({"success":false,"message":"Invalid File"})
    }
    else
    {
        SubPlaces.updateOne({_id : id}, {
            SubPlaces_picture : SubPlaces_picture.filename
        })
        .then(function(result){

            res.status(201).json({message : "SubPlaces comment image inserted!!", success: true, data: result})
        })
        .catch(function(e){
           console.log(e)
        })
    }
})

router.get('/subplaces/showall', function(req,res){
    SubPlaces.find()
    .then(function(data){
    //  console.log(data)
        res.status(200).json({success: true, data: data})
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/subplaces/single/:id', function(req,res){
    const id = req.params.id;
    SubPlaces.findOne({_id : id})
    .then(function(data){
        res.status(200).json(data)
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

router.get('/subplaces/places/:place', function(req,res){
    const place = req.params.place;
    SubPlaces.findOne({Places : place})
    .then(function(data){
        res.status(200).json({success: true, data: data})
        console.log("hello")
    })
    .catch(function(e){
        res.status(500).json({error : e})
    })
})

module.exports = router