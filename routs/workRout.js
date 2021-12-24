const express = require("express");
const { createWork } = require("../controllers/workController");
const { addWorkToCalendar } = require("../controllers/calendarController")

const router = express.Router();

router
    .route("/create")
        .post(createWork, addWorkToCalendar)

module.exports = router;