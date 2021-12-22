const express = require("express");
const app = express();
const calendarRouter = require("./routs/calendar/calendarRout")

app.use("/calendar", calendarRouter);
app.use("*", (req, res, next) => {
    res.sendStatus(201);
})

module.exports = app;