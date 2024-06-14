
const Router = require("express");
const router = new Router();
const AskController = require("../controllers/AskController")

router.post("/", AskController.submitQuestion);
router.get("/", AskController.getQuestions);



module.exports = router