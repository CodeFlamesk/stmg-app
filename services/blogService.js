
const uuid = require("uuid");
const path = require("path");
const readingTime = require("reading-time");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");


class BlogService {

    async addImage(req, file) {
        try {
            const fileName = uuid.v4() + ".webp";
            const filePath = path.join(req.pathStatic, fileName);
            await file.mv(filePath);
            
            return fileName;
        }catch(e) {
            console.log(e)
        }
    }

    async createDate(){
        try {
            const dates = new Date();
            function getMonthName(month) {
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                return monthNames[month];
            }
        
            return `${getMonthName(dates.getMonth())} ${dates.getDate()}, ${dates.getFullYear()}`;
        }catch(e) {
            console.log(e)
        }
    }

    async createTimeReading(description) {
        try {
            const {time} = await readingTime(description);

            return `${Math.ceil(time / 1000 / 60)} minutes`;
            
        }catch(e) {
            console.log(e)
        }
    }


    async addComment(postId, commentId) {
        try {

            const post = await Blog.findById({_id: postId});

            await post.comments.push(commentId);

            const comments = post.comments;

            let sum = 0;
            for(let i = 0; i <= comments.lenght; i++) {
                const comment = await Comment.findById({_id: comments[i]._id});
                sum += comment.rating;
            } 

            post.rating = Math.ceil(sum / Object.keys(comments).length);

            post.save();

        } catch(e) {
            throw e
        }
    }

    async deleteComment(id) {
        try {
            const blog = await Blog.findOne({comments: id});

            if (!blog) {
                throw  ApiError.BadRequest('Пост на который ссылается данный комментарий,  не был найден!')
            } 

            blog.comments = await blog.comments.filter(item => item._id !== id);

            await blog.save(); 

        } catch(e) {
            throw e
        }
    }
}

module.exports = new BlogService;
