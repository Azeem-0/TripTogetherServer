const tripsModel = require('../models/tripsModel');
const jwt = require("jsonwebtoken");

async function findTrips(req, res) {
    try {
        const trips = await tripsModel.find({}).populate("user_Id");
        if (trips.length === 0) {
            res.json({ message: "No trips found", status: false });
        }
        else {
            let tripDetails = [];
            trips.map((ele) => {
                const tempTrip = {
                    id: ele._id,
                    source: ele.source,
                    destination: ele.destination,
                    vehicleSpecs: ele.vehicleSpecs,
                    name: ele.user_Id.name,
                    email: ele.user_Id.email,
                    phNumber: ele.user_Id.phNumber,
                    cost: ele.cost,
                    availableSeats: ele.availableSeats,
                    timeDetails: ele.timeDetails,
                    stopOvers: ele.stopOvers,
                }
                tripDetails.push(tempTrip);
            });
            res.json({ message: "Successfully fetched all the trips", status: true, tripDetails: tripDetails });
        }
    }
    catch (err) {
        console.log("HELLO", err.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false, tripDetails: [] })
    }
}
async function startTrips(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decodedToken = jwt.decode(token, process.env.SECRET);
            const userId = decodedToken.id;
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
        else {
            res.json({ message: "Token is missing! Please log out and log in", status: false });
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false });
    }
}

async function findBySD(req, res) {
    try {
        const { source, destination, seats, type } = req.body.search;
        const trips = await tripsModel.find({
            $or: [{ source: { $regex: source, $options: 'i' } }, { stopOvers: { $all: [source] } }],
            $or: [{ destination: { $regex: destination, $options: 'i' } }, { stopOvers: { $all: [destination] } }], 'vehicleSpecs.vehicleType': type, availableSeats: { $gte: seats }
        }).populate("user_Id");
        let tripDetails = [];
        trips.map((ele) => {
            const tempTrip = {
                source: ele.source,
                destination: ele.destination,
                vehicleSpecs: ele.vehicleSpecs,
                name: ele.user_Id.name,
                email: ele.user_Id.email,
                phNumber: ele.user_Id.phNumber,
                cost: ele.cost,
                availableSeats: ele.availableSeats,
                timeDetails: ele.timeDetails,
                stopOvers: ele.stopOvers
            }
            tripDetails.push(tempTrip);
        });
        res.json({ status: true, message: "Successfully fetched", trips: tripDetails });
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false })
    }
}

module.exports = { findTrips, startTrips, findBySD };