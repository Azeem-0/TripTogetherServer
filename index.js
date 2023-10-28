require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
const authentication = require("./apis/authApi");
const mongoose = require("mongoose");
const getDetails = require("./apis/getDetails");
const { checkTimeValidity, checkAvailableSeats } = require("./controllers/schedularController");
const cron = require("node-cron");
const trips = require("./apis/trips");
const app = express();


mongoose.connect(process.env.DB).then(() => {
    console.log("Connected to Database");
});

cron.schedule('30 3 * * *', () => {
    checkTimeValidity();
    checkAvailableSeats();
});

// MiddleWares
app.use(cors());
app.use(express.json());
app.use("/auth", authentication);
app.use("/", getDetails);
app.use("/trips", trips);



app.listen(port, () => {
    console.log(`listening at port ${port}`);
})