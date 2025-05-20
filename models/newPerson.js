const mongoose = require('mongoose')

const presonchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        enum: ["BCA", "MCA", "BTECH"],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    college: {
        type: String,
        required: true
    },
}, { timeseries:true })

const student = mongoose.model("Student", presonchema);
module.exports = student;