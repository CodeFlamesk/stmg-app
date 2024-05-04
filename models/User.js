const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
    name: {type:String, required:true},
    surname:{type:String, required:true},
    avatar: {type:String, required:true},
    blogs: [{type:ObjectId, ref: "Blog"}],
    password: {type:String, required:true},
    email:{type:String, required:true, unique:true},
})

module.exports = model("User", User);