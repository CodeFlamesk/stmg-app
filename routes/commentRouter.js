const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController")
const roleMiddleware = require("../middleware/role.middleware")

router.post("/add", commentController.add);
router.delete("/delete", commentController.delete);
router.get("/all", commentController.getAllComments);

router.post("/check",roleMiddleware("ADMIN"),  commentController.check);

module.exports = router