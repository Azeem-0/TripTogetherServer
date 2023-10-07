require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const app = express();


mongoose.connect(process.env.DB).then(() => {
    console.log("Connected to Database");
});


app.listen(port, () => {
    console.log(`listening at port ${port}`);
})