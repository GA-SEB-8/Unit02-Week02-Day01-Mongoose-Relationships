const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({
    creator: String,
    content: String,
}, {timestamps:true})

// Schema
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        min:0,
        max:100
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    author:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author"
    }],
    comments: [commentSchema]
})


// model
const Book = mongoose.model("Book",bookSchema)


// export the model
module.exports = Book