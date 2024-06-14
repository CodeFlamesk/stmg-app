const Comment = require("../models/Comment");
const commentService = require("../services/commentService");


class CommentController {

    async add(req, res, next) {
        try {
            const {id, rating, body, postId} = req.body;
            const comment = await commentService.add(id, rating, body, postId);

            return res.json(comment)
        } catch(e) {
            next(e)
        }
    }
    
    async delete(req, res, next) {
        try {

            const {commentId, userId} = req.body;

            const message = await commentService.delete(commentId, userId);

            return res.json({message:message})
        } catch(e) {
            next(e)
        }
    }

    async getAllCommentsCheck(req, res, next) {
        try {
            const comments = await Comment.find({isCheck: true}).limit(6);
            return res.json(comments)
        } catch(e) {
            next(e)
        }
    }

    async getAllComments(req, res, next) {
        try {
            const comments = await Comment.find({isCheck:false});
            return res.json(comments)
        } catch(e) {
            next(e)
        }
    }
    
    async check(req, res, next) {
        // role ADMIN
        try {
            const {id} = req.body;

            const comment = await Comment.findById({_id: id});

            comment.isCheck = true;
            await comment.save()
            return res.json({message: "ADMIN подтвердил комментарий"});
        } catch(e) {
            next(e)
        }
    }

}


module.exports = new CommentController