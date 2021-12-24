const express = require("express");
const { pushMonth } = require("../controllers/calendarController");
const { getTrucksId } = require("../controllers/truckController");

const router = express.Router({ mergeParams: true });

router
    .get("/createMonth", [getTrucksId, pushMonth]);

module.exports = router;