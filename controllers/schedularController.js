const tripsModel = require("../models/tripsModel");
const moment = require("moment");

const checkTimeValidity = async () => {
    try {
        const currentDate = moment().format('M/D/YYYY');
        await tripsModel.deleteMany({
            'timeDetails.tripDate': { $lt: currentDate }
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