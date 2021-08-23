const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const TravelPoint = require('../models/travelpoint_model')

router.get('/getMyPoints',auth.authorizeUser,(req,res)=>{
    TravelPoint.findOne({"user_id":req.user._id})
    .then((data)=>{
        if(data!=null)
        {
            return res.status(200).json({"success":true,"message":"Data Fetched","data":data,"point":data.points})
        }
        else {
            return res.status(202).json({"success":false,"message":"No Record"})
        }
    })
    .catch((err)=>{
        return res.status(404).json({"success":false,"message":err});
    })
})


router.put('/bookingSoldOrCancel',auth.authorizeUser,auth.verifyAdminAndStaff,(req,res)=>{
    let bookingId = req.body['bookingId'];
    let decision = req.body['decision'];
    
    let bookingInstance = FutsalBooking.findOne({"_id":bookingId,"paymentStatus":"Not Paid"})
    .populate({
        "path":"futsalInstance_id",
        "populate":{
            "path":"futsal_id",
            "select":['futsalName','futsalCode']
        }
        
    });
    bookingInstance.then((data)=>{
        if(data != null)
        {
            if(decision == "Paid")
            {
                let price = data.futsalInstance_id.superPrice > 0? data.futsalInstance_id.superPrice : data.futsalInstance_id.price;
                let points = price/100;
                let fp = FutsalPoint.findOne({"user_id":data.user_id});
                fp.then((data2)=>{
                    if(data2 != null)
                    {
                        FutsalPoint.updateOne({"_id":data2._id},{$set:{"points":(data2.points+points),"updatedAt":getFormattedToday(new Date()),"status":"Incremented"}})
                        .then((result)=>{
                            FutsalBooking.updateOne({"_id":data._id},{$set:{"paymentStatus":"Paid"}})
                            .then((result2)=>{
                                return res.status(200).json({"success":true,"message":"Booking Detail Checked."})
                            })
                        .catch((err)=>{
                            return res.status(404).json({"success":false,"message":err});
                        })
                        })
                    }
                