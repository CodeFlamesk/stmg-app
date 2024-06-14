const Ask = require("../models/Ask");
const User = require("../models/User"); 
const blogService = require("../services/blogService");


class AskController {
    async submitQuestion(req, res) {
        try {
            const { ask, userEmail } = req.body;

            const newQuestion = new Ask({
                ask,
                userEmail,
                date: await blogService.createDate(),
                answer: ""
            });

            await newQuestion.save();

            res.status(201).json({ message: "Question submitted successfully" });

        } catch (error) {
            res.status(500).json({ message: "Error submitting question", error });
        }
    }

    async getQuestions(req, res) {
        try {

            const questions = await Ask.find();

            res.status(200).json(questions);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving questions", error });
        }
    }
}

module.exports = new AskController;
