const tripsModel = require("../models/tripsModel");

const checkTimeValidity = async () => {
    try {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString();
        const day = currentDate.getDate().toString();
        const year = currentDate.getFullYear().toString();
        const formattedDate = `${month}/${day}/${year}`;
        await tripsModel.deleteMany({ 'timeDetails.tripDate': { $lt: formattedDate } });
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