const express = require("express");
const { createWork } = require("../controllers/workController");
const { addWorkToCalendar } = require("../controllers/calendarController")

const router = express.Router({ mergeParams: true });


router
    .post("/month/:month/date/:date/truck/:truck", [createWork, addWorkToCalendar]);

module.exports = router;