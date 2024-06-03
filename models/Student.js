const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
   

})

module.exports = mongoose.model('Students', studentSchema)