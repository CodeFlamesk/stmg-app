const {Schema, model} = require("mongoose")


const Category = new Schema({
    title: {type:String, required:true, unique:true}
})


module.exports = model("Category", Category);