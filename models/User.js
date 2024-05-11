const {Schema, model} = require("mongoose")

const User = new Schema({
    surname: {type:String, required:true},
    name: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    password: {type:String, required:true},
    isActivated: {type:Boolean, required: false},
    activationLink: {type:String},
    role:{type:String, required:true, default: "USER"}
})

module.exports = model("User", User);