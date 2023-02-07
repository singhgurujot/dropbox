const mongoose = require('mongoose');
var filesModel = new mongoose.Schema({
    fileName: {
        type: String    
    }
}, {timestamps:true});
module.exports = mongoose.model('filedetails',filesModel)