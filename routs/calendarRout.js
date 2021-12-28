const express = require("express");
const { pushMonth, getCalendar } = require("../controllers/calendarController");
const { getTrucksId } = require("../controllers/truckController");

const router = express.Router({ mergeParams: true });

router
    .get("/createMonth", [getTrucksId, pushMonth]);

router
    .get("/", getCalendar);

module.exports = router;