const {Schema, model} = require("mongoose")

const Ask = new Schema({
    ask: {type: String, required:true},
    userEmail: {type:String, required:true},
    date: {type:String, required:true},
    answer:{type:String, required:false}
})

module.exports = model("Ask", Ask);