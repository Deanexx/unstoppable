const express = require("express");
const { pushMonth } = require("./../../controllers/calendarController")

const router = express.Router();

router
    .get("/createMonth", pushMonth);

module.exports = router;