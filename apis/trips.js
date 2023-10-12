const express = require('express');
const { findTrips, startTrips, findBySD } = require("../controllers/tripsController");
const router = express.Router();


router.get("/findTrip", findTrips);
router.post("/startTrip", startTrips);
router.post("/findTripBySD", findBySD);

module.exports = router;