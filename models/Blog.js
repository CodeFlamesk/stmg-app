const {Schema, model, ObjectId} = require("mongoose")


const Blog = new Schema({
    mainTitle: {type:String, required:true},
    imageBlog: {type:String, required:true},
    introductionText:{type:String, required:true},
    author: {type:String,  required:true},
    categoryId:{type:String, required:true},
    readingTime:{type:String, required:true},
    likes: {type:Number, required:true, default: 0},
    comments: [{type:ObjectId, required:false, ref: "Comment"}],
    share:  {type:Number, required:true, default: 0},
    description:{type:String, required:true},
    descriptionTag:{type:String, required:true},
    date: {type:String, required: true},
    rating:  {type:Number, required:true, default: 0},
})

module.exports = model("Blog", Blog);