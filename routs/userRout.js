const express = require("express");

const { register, login, logout } = require("../controllers/userController");
const { saveTokens, deleteToken } = require("../controllers/tokenController");

const rout = express.Router({ mergeParams: true });

rout.post("/register", [register, saveTokens])
rout.post("/login", [login, saveTokens])
rout.get("/logout", [logout, deleteToken])

module.exports = rout;