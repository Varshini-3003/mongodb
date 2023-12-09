const mongoose = require('mongoose');

const user = mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    Phone:{
        type:Number
    }
})

module.exports = mongoose.model('sample',user);