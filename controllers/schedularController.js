const tripsModel = require("../models/tripsModel");

const checkTimeValidity = async () => {
    try {
        const currentDate = new Date();
        console.log(currentDate);
        await tripsModel.deleteMany({
            'timeDetails.tripDate': { $lt: currentDate.toISOString() }
        });
    }
    catch (err) {
        console.log(err.message);
    }
}

const checkAvailableSeats = async () => {
    try {
        await tripsModel.deleteMany({ availableSeats: 0 });
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = { checkAvailableSeats, checkTimeValidity }