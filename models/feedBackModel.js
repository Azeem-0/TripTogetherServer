const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
    {
        name:String,
        email:{
            type:String,
            unique:false
        },
        message:String
    },
);
const feedbackModel = mongoose.model("feedback",feedbackSchema);
module.exports = feedbackModel;