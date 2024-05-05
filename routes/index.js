const Router = require("express");
const router = new Router();
const categoryRouter = require("./categoryRouter")
const blogRouter = require("./blogRouter")

router.use("/category", categoryRouter)
router.use("/blog", blogRouter)

module.exports = router
