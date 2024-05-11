const Router = require("express");
const router = new Router();
const CategoryController = require("../controllers/categoryController")
const roleMiddleware = require("../middleware/role.middleware");

router.post("/",roleMiddleware("ADMIN"), CategoryController.addCategory)
router.get("/",   CategoryController.getCategory)
router.delete("/:id", roleMiddleware("ADMIN"),    CategoryController.deleteCategory)

module.exports = router