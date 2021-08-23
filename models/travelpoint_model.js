const mongoose = require('mongoose');
const {ObjectId} = require('bson');
const User = require('./user_models');
 
const TravelPoint = mongoose.model("TravelPoint",{
    "user_id":{"type":ObjectId,"required":true,"unique":true,"ref":User},
    "points":{"type":Number,"required":true},
    "updatedAt":{"type":String,"required":true},
    "status":{"type":String,"required":true,"enum":["Incremented","Decremented","Neutral"]}
})
 
module.exports = FutsalPoint;