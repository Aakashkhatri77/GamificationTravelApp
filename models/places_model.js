const mongoose = require('mongoose');

const Places = mongoose.model('Places',{
    pimage : {
        type : String
    },
    pname : {
        type : String
    },
})

module.exports = Places;