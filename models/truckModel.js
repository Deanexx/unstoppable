const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Truck", truckSchema);