const tripsModel = require('../models/tripsModel');
const jwt = require("jsonwebtoken");

async function findTrips(req, res) {
    try {
        const trips = await tripsModel.find({}).populate("user_Id");
        if (trips.length === 0) {
            res.json({ message: "No trips found", status: false });
        }
        else {
            res.json({ message: "Successfully fetched all the trips", status: true, tripDetails: trips });
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false, tripDetails: [] })
    }
}

async function startTrips(req, res) {
    const { vehicle_color, vehicle_type, vehicle_model, vehicle_number } = req.body.details;
    const { source, destination, available_seats, cost } = req.body.details;
    const { start_time, reach_time, trip_date, stop_overs } = req.body.details;
    const newTrip = new tripsModel({
        source: source,
        destination: destination,
        user_Id: userId,
        vehicleSpecs: {
            vehicleColor: vehicle_color,
            vehicleModel: vehicle_model,
            vehicleNumber: vehicle_number,
            vehicleType: vehicle_type
        },
        timeDetails: {
            start: start_time,
            end: reach_time,
            tripDate: trip_date
        },
        stopOvers: stop_overs,
        availableSeats: available_seats,
        cost: cost,
    });
    await newTrip.save();
    res.json({ message: "Successfully posted!", status: true });
}
module.exports = { findTrips, startTrips };