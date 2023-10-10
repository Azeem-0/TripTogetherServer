const express = require("express");
const { getRegistration, getLogin } = require("../controllers/authController");
const router = express.Router();

router.post("/login", getLogin);
router.post("/register", getRegistration);

module.exports = router;