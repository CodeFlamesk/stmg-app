
const Blog = require("../models/Blog");
const Comment = require("../models/Comment")
const blogService = require("./blogService")

class CommentService {

    async add(userId, rating, body, postId) {
        try {

            const date = await blogService.createDate();

            const comment = await Comment.create({user: userId, rating, body, date, postId});
            await comment.save();

            await blogService.addComment(postId, comment._id);

            return comment;
        } catch(e) {
            throw e
        }
    }
    
    async delete(commentId, userId) {

        try {   
            await Comment.findById({_id:commentId});

            await blogService.deleteComment(commentId);
            await userService.deleteComment(userId, commentId);
            
            return res.json({message: "Вы удалили комментарий"});

        } catch(e) {
            throw e;
        }
    }

}

module.exports = new CommentService