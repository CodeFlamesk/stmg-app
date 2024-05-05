

const BlogService = require("../services/blogService");
const Blog = require("../models/Blog");
const readingTime = require("reading-time");
const Category = require("../models/Category");




class BlogController {

    async addBlog(req, res) {
        try {
            //Проверка есть ли  файлы в запросе
            const _id = req.params.id;
            const {
                descriptionTag, 
                mainTitle, 
                intro, 
                author, 
                description, 
            } = req.body;

            // Достатьфайл из запроса
            const file = req.files.file
            
            // вернуть имя файла и переместить файл в папку static
            const fileName = await BlogService.addImage(req, file);
            const {time} = await  readingTime(description);

            const category = await Category.findById({_id})
            const blog = new Blog({
                mainTitle:mainTitle, 
                imageBlog: fileName,
                introductionText: intro,
                author: author,
                categoryId: category.title,
                readingTime: time,
                description:description,
                descriptionTag:descriptionTag,
                date: new Date()
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

    async getBlogs(req, res) {
        try {
            const {categoryId} = req.query;
            const blogs = await Blog.find({categoryId: categoryId});
            return res.json(blogs)
        }catch(e) {
            console.log(e)
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