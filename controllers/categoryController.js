
const Category = require("../models/Category");
const Blog = require("../models/Blog")

class CategoryController {


    async addCategory(req,res) {
        try {
            const {title} = req.body;
            const checkCategory = await Category.findOne({title})

            if(checkCategory) {
                return res.status(400).json({message: `Category ${title} already exist`})
            }

            const category = new Category({title});

            await category.save()
            return res.json(category)
        }catch(e) {
            console.log(e)
        }
    }

    async getCategory(req, res) {
        try {
            const category = await Category.find();
            return res.json(category)
        }catch(e) {
            console.log(e)
        }
    }

    async deleteCategory(req, res) {
        try {
            const _id = req.params.id;

            const category = await Category.findById({_id});

            if(!category) {
                return res.status(400).json({message: `Category  does not exist`})
            }

            const linksBlogs = await Blog.find({categoryId: _id});
            
            if(linksBlogs.length > 0) {
                return res.status(400).json({message: `You can't delete a category that a blog links to`})
            }

            await Category.deleteOne({_id});
            //
            return res.json({message:`Category  removal completed`});
            //
        }catch(e) {
            console.log(e)
        }
    }
}

module.exports = new CategoryController