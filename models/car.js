const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    isAvailable: {
        type: String,
        required: true
      },

})



module.exports = mongoose.model('Car',carSchema)