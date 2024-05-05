const Router = require("express");
const router = new Router();
const BlogController = require("../controllers/blogController")

router.post("/:id", BlogController.addBlog);
router.get("/:id", BlogController.getBlog);
router.get("", BlogController.getBlogs);
router.delete("/:id", BlogController.deleteBlog);


module.exports = router