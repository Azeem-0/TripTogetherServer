require("dotenv").config();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getRegistration(req, res) {
    try {
        const { name, email, phNumber, password } = req.body.authInfo;
        const user = await userModel.findOne({ email: email });
        if (user) {
            res.json({ message: "Already registered! Please try to log in ", status: false });
        }
        else {
            try {
                bcrypt.hash(password, 10).then((hashedPassword) => {
                    const newUser = new userModel({
                        name: name,
                        email: email.toLowerCase(),
                        phNumber: phNumber,
                        address: "",
                        password: hashedPassword,
                    });
                    newUser.save();
                })
                res.json({ message: "Successfully Registered!", status: true, user: false });
            }
            catch (error) {
                console.log(error.message);
                res.json({ message: "There is some issue.Please Try Again!", status: false });
            }
        }
    }
    catch (error) {
        console.log(error.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false });
    }
}

async function getLogin(req, res) {

    const { email, password } = req.body.authInfo;
    try {
        const user = await userModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            res.json({ message: "There is no account registered! Please Register", status: false });
        }
        else {
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                res.json({ message: "Incorrect Password", status: false, user: false })
            }
            else {
                const accessToken = jwt.sign({
                    id: user._id,
                    email: user.email,
                    name: user.name
                }, process.env.SECRET, { expiresIn: "3h" });
                res.json({ message: "Successfully logged in", status: true, user: accessToken })
            }
        }
    }
    catch (error) {
        console.log(error.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false, user: false });
    }
}


async function authorize(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.json({ message: "Missing Token", status: false });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.decode(token, process.env.SECRET);
        if (decodedToken) {
            const expiryTimestamp = decodedToken.exp;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (expiryTimestamp && currentTimestamp > expiryTimestamp) {
                res.json({ message: "Token Expired!", status: false });
            } else {
                res.json({ message: "Token valid", status: true });
            }
        }
        else {
            res.json({ message: "Token Invalid", status: false })
        }
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false })
    }
}

module.exports = { getRegistration, getLogin, authorize };