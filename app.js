const express = require("express");
const app = express();

const workRouter = require("./routs/workRout");
const calendarRouter = require("./routs/calendarRout")
const truckRouter = require("./routs/truckRout")

// middlewares

app.use(express.json());

// routers

app.use("/calendar", calendarRouter);
app.use("/truck", truckRouter);
app.use("/work", workRouter);


app.use("*", (req, res, next) => {
    res.status(400).send("Rout not found")
})

module.exports = app;