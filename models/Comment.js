const {Schema, model, ObjectId} = require("mongoose")

const Comment = new Schema({
    user: {type:ObjectId, ref: "User"},
    rating: {type:Number, required: true, default:0},
    date: {type:String, required:true},
    body: {type:String, required:true},
    isCheck:{type:Boolean, required:true, default:false},
    postId: {type:ObjectId, ref: "Blog"},
})

module.exports = model("Comment", Comment);