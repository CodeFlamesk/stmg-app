const {Schema, model} = require("mongoose")

const Feedback = new Schema({
    email: {type: String, required:true, unique:true},
    firstName: {type: String, required:true, unique:true},
    lastName:{type: String, required:true, unique:true},
    message: {type: String, required:true, unique:true},
    tel:{type:Number, required:true, unique: true},
    date: {type:String, required:true},
})

module.exports = model("Feedback", Feedback);