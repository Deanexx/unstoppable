const express = require("express");
const { checkRefreshToken, saveTokens } = require("../controllers/tokenController");
const { getUserById } = require("../controllers/userController");

const rout = express.Router({ mergeParams: true });

rout
    .get("/refresh", [checkRefreshToken, getUserById, saveTokens])

module.exports = rout;