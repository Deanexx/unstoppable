const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: mongoose.Schema.ObjectId,
    token: String
})

module.exports = mongoose.model("Token", tokenSchema);