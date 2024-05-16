const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
    surname: {type:String, required:true},
    name: {type:String, required:true},
    avatar: {type:String, required:false}, 
    email:{type:String, required:true, unique:true},
    password: {type:String, required:true},
    isActivated: {type:Boolean, required: false},
    activationLink: {type:String},
    role:{type:String, required:true, default: "USER"},
    comments: [{type:ObjectId, ref: "Comment"}]
})

module.exports = model("User", User);