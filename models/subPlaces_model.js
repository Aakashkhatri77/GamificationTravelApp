const mongoose = require('mongoose');

const SubPlaces = mongoose.model('SubPlaces',{
    SubPlaces_image : {
        type : String
    },
    SubPlaces_name : {
        type : String
    },
    SubPlaces_details : {
        type : String
    },
    SubPlaces_picture : {
        type : String
    },
    Places : {
        type : String
    },


})

module.exports = SubPlaces;