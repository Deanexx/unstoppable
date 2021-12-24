const mongoose = require("mongoose");

const monthSchema = new mongoose.Schema({
    year: Number,
    month: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        required: true
    },
    dates: [{
        date: {
            type: Number,
            enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            required: true
        },
        weekDate: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6],
            required: true
        },
        trucks: [{
            truck: {
                type: mongoose.Schema.ObjectId,
                ref: "Truck"
            },
            color: {
                type: String,
                enum: ["low", "medium", "hard"],
                default: "low"
            },
            work: [{
                type: mongoose.Schema.ObjectId,
                ref: "Work"
            }]
        }],
    }]
})

module.exports = mongoose.model("Month", monthSchema);