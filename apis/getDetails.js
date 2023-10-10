const express = require("express");
const {putFeedBack} = require("../controllers/getDetailsController");
const router = express.Router();

router.post("/postFeedBack",putFeedBack);

module.exports = router;