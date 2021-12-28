const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");

const workRouter = require("./routs/workRout");
const calendarRouter = require("./routs/calendarRout");
const truckRouter = require("./routs/truckRout");
const userRouter = require("./routs/userRout");
const tokenRouter = require("./routs/tokenRout");

// middlewares

app.use(express.json());
app.use(cors({
    credentials: true
}))
app.use(cookieParser())

// routers

app.use("/calendar", calendarRouter);
app.use("/truck", truckRouter);
app.use("/work", workRouter);
app.use("/user", userRouter);
app.use("/token", tokenRouter);

app.use("*", (req, res, next) => {
    res.status(400).send("Rout not found")
})

module.exports = app;