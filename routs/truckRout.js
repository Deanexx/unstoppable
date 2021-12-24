const express = require("express");
const { pushTruck } = require("./../controllers/truckController")


const router = express.Router();

router
    .get("/create/:name", pushTruck)

module.exports = router;