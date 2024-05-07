const {Schema, model} = require("mongoose")

const User = new Schema({

    email:{type:String, required:true, unique:true},
    password: {type:String, required:true},
    isActivated: {type:Boolean, required: false},
    activationLink: {type:String},
})

module.exports = model("User", User);