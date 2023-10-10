const express = require('express');
const { findTrips, startTrips } = require("../controllers/tripsController");
const router = express.Router();

router.get("/findTrip", findTrips);
router.post("/startTrip", startTrips);

module.exports = router;