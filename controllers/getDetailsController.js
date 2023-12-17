const feedbackModel = require("../models/feedBackModel");
const userModel = require('../models/userModel');
async function putFeedBack(req, res) {
    try {
        const { name, email, message } = req.body.feedback;
        const user = await feedbackModel.findOne({ email: email });
        if (user) {
            await feedbackModel.updateOne({ email: email }, { $push: { message: message } });
        }
        else {
            const newFeedBack = new feedbackModel({
                name: name,
                email: email,
                message: message
            });
            newFeedBack.save();
        }
        res.json({ message: "Thanks for Contacting us,we will get back to you in a while.", status: true })
    }
    catch (err) {
        console.log(err.message);
        res.json({ message: "There is some issue.Please Try Again!", status: false })
    }
}
module.exports = { putFeedBack };