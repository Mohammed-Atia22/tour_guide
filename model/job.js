const mongoose = require('mongoose');

const jobschema = new mongoose.Schema({
    city:{
        type:String,
        required:[true,'please provide your Job city'],
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
    fdate:{
        type:Date,
        required:[true,'please provide your Job time'],
    },
    sdate:{
        type:Date,
        required:[true,'please provide your Job time'],
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



module.exports = mongoose.model('job',jobschema);