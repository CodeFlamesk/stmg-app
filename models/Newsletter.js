const {Schema, model} = require("mongoose")

const Newsletter = new Schema({
    email: {type: String, required:true, unique:true},
})

module.exports = model("Newsletter", Newsletter);