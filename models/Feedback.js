const {Schema, model} = require("mongoose")

const Feedback = new Schema({
    email: {type: String, required:true},
    firstName: {type: String, required:true},
    lastName:{type: String, required:true},
    message: {type: String, required:true},
    tel:{type:Number, required:true},
    date: {type:String, required:true},
})

module.exports = model("Feedback", Feedback);