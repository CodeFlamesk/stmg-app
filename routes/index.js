const Router = require("express");
const router = new Router();
const categoryRouter = require("./categoryRouter");
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");

router.use("/category", categoryRouter)
router.use("/blog", blogRouter)
router.use("/user", userRouter)

module.exports = router
