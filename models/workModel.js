const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    customer: String,
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    elevetor: {
        type: Boolean,
        default: false
    },
    stairs: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Work", workSchema);