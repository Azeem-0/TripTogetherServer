const mongoose = require("mongoose")
const tripsSchema = new mongoose.Schema(
    {
        user_Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        vehicleSpecs:
        {
            vehicleType: {
                type: String
            },
            vehicleModel: {
                type: String
            },
            vehicleNumber: {
                type: String
            },
            vehicleColor: {
                type: String
            },
        },
        timeDetails: {
            start: String,
            end: String,
            tripDate: String
        },
        stopOvers: [
            {
                type: String
            }
        ],
        availableSeats: {
            type: Number
        },
        cost: {
            type: Number
        },
        source: {
            type: String
        },
        destination: {
            type: String
        }
    },
);
const tripsModel = mongoose.model("trips", tripsSchema);
module.exports = tripsModel;