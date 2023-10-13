const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phNumber: {
        type: Number,
        required: true
    },
});

userSchema.set('timestamps', true);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;