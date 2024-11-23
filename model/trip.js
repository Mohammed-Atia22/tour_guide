const mongoose = require('mongoose');

const tripschema = new mongoose.Schema({
    city:{
        type:String,
        required:[true,'please provide your trip city'],
        minlength:5,
        maxlength:50
    },
    flanguage:{
        type:String,
        required:[true,'please provide your first language'],
        minlength:5,
        maxlength:50
    },
    slanguage:{
        type:String,
        required:[true,'please provide your second language'],
        minlength:5,
        maxlength:50
    },
    time:{
        type:String,
        required:[true,'please provide your trip time'],
        minlength:5,
        maxlength:50
    },
    money:{
        type:Number
    },
    createdby:{
        type:String,
        required:[true,'please provide your ID'],
        minlength:5,
        maxlength:50
    }

})



module.exports = mongoose.model('trip',tripschema);