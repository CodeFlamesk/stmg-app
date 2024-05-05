const Router = require("express");
const router = new Router();
const CategoryController = require("../controllers/categoryController")

router.post("/", CategoryController.addCategory)
router.get("/", CategoryController.getCategory)
router.delete("/:id", CategoryController.deleteCategory)

module.exports = router