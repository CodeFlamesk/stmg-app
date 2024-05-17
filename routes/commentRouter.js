const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController")
const roleMiddleware = require("../middleware/role.middleware")

router.post("/add", commentController.add);
router.delete("/delete", commentController.delete);
router.get("/check/all", commentController.getAllCommentsCheck);

router.get("/admin/all",roleMiddleware("ADMIN"), commentController.getAllComments);

router.post("/admin/check",roleMiddleware("ADMIN"),  commentController.check);

module.exports = router