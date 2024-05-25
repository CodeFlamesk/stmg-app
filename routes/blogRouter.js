const Router = require("express");
const router = new Router();
const BlogController = require("../controllers/blogController")

router.post("/:id", BlogController.addBlog);
router.get("/blog/:id", BlogController.getBlog);
router.get("/blogs/all", BlogController.getAllBlogs);
router.delete("/:id", BlogController.deleteBlog);


module.exports = router