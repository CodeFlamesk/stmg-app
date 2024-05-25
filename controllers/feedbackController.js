
const Feedback = require("../models/Feedback");
const blogService = require("../services/blogService")

class FeedbackController {
    async sendFeedback(req, res) {
        try {
            const {lastName, firstName, email, message, tel} = req.body;

            const date = await blogService.createDate();
            
            const feedback = await Feedback.create({
                lastName,
                firstName,
                date: date,
                email,
                message,
                tel
            })

            await feedback.save();
            
            return res.json({message:"Thanks for your feedback"});
        } catch(e) {
            console.log(e)
        }
    }
}


module.exports = new FeedbackController