const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    name:{
        type:String
    }
})

const Author = mongoose.model("Author",authorSchema)

module.exports = Author