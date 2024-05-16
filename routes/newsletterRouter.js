const Router = require("express");
const router = new Router();
const NewsletterController = require("../controllers/newsletterController")
const {body} = require("express-validator")



router.post("/",
    body("email").isEmail(),
    NewsletterController.subscribe
)


module.exports = router