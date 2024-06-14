

const BlogService = require("../services/blogService");
const Blog = require("../models/Blog");
const Category = require("../models/Category");
const User = require("../models/User")




class BlogController {

    async addBlog(req, res) {
        try {

            const categoryId = req.params.id;
            const {
                descriptionTag, 
                mainTitle, 
                intro,
                description,
                id
            } = req.body;
        
            const date = await BlogService.createDate();
            const user = await User.findById({_id: id});
            const {file} = req.files;
        
            console.log(file)
            const fileName = await BlogService.addImage(req, file);


            const time = await BlogService.createTimeReading(description)

            const category = await Category.findById({_id: categoryId})
            const blog = new Blog({
                mainTitle:mainTitle, 
                imageBlog: fileName,
                introductionText: intro,
                author: `${user.name}` + ` ${user.surname}`,
                categoryId: category.title,
                readingTime: time,
                description:description,
                descriptionTag:descriptionTag,
                date: date
            });
            
            await blog.save();

            return res.json(blog)
            
        }catch(e) {
            console.log(e)
        }
    }

    async getBlog(req, res) {
        try {
            const _id = req.params.id;
            const blog = await Blog.findById({_id})

            return res.json(blog)
        }catch(e) {
            console.log(e)
        }
    }

    async getAllBlogs(req, res) {
        try {

            const {id} = req.query;

            if(id === "") {
                const blogs = await Blog.find().limit(3)
                return res.json(blogs);
            } else {
                const category = await Category.findById({_id: id})
                const blogs = await Blog.find({categoryId:category.title}).limit(3)
                return res.json(blogs);
            }
        }catch(e) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteBlog(req, res) {
        try {
            const {id} = req.query;

            await Blog.findOneAndDelete({_id: id})

            return res.json({message: "Delete blogs article"})
        }catch(e) {
            console.log(e)
        }
    }
    
}

module.exports = new BlogController