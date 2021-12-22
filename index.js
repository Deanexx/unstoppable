require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("DB is connected"))
.catch(err => console.log(err))

app.listen(8000, () => {
    console.log("App is running on a port " + process.env.DB);
})