const Router = require("express");
const router = new Router();
const categoryRouter = require("./categoryRouter")


router.use("/category", categoryRouter)


module.exports = router
