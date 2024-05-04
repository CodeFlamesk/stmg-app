const {Schema, model, ObjectId} = require("mongoose")


const Blog = new Schema({
    imageBlog: {type:String, required:true},
    mainTitle:{type:String, required:true},
    introductionTitle:{type:String, required:true},
    introductionText:{type:String, required:true},
    authorName: {type:ObjectId, ref: "User",  required:true},
    categoryId:{type:ObjectId, required:true, ref: "Category"},
    readingTime:{type:Number, required:true},
    likes: {type:Number, required:true, default: 0},
    comments: [{type:ObjectId, required:false, ref: "Comment"}],
    share:  {type:Number, required:true, default: 0},
})

module.exports = model("Blog", Blog);