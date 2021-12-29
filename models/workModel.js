const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    customerName: String,
    customerPhoneNumber: String,
    customerEmail: String,
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
    longWalk: {
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
    },
    note: {
        type: String
    }
})

module.exports = mongoose.model("Work", workSchema);