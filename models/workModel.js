const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    where: {
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
    customer: String,
    price: {
        type: Number,
        default: 0
    },
    trucks: [{
        type: mongoose.Schema.ObjectId,
        ref: "Truck"
    }]
})
