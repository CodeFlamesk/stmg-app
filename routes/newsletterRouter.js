const Router = require("express");
const router = new Router();
const NewsletterController = require("../controllers/newsletterController")

router.post("/", NewsletterController.subscribe)


module.exports = router