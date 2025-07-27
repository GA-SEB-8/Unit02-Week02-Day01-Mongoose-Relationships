// import the model
const Book = require("../models/Book")
const Author = require("../models/Author")
// import the router
const router = require("express").Router()



// write your routes

router.get("/new",async(req,res)=>{
    const allAuthors = await Author.find()
    res.render("books/new.ejs",{allAuthors: allAuthors})
})

router.post("/",async(req,res)=>{
    try{
        await Book.create(req.body)
        res.redirect("/books/new")
    }
    catch(error){
        console.log(error)
    }
})

router.get("/",async(req,res)=>{
    try{
        const allBooks = await Book.find().populate("author")
        console.log(allBooks)
        res.render("books/all-books.ejs",{allBooks: allBooks})
    }
    catch(error){
        console.log(error)
    }
})


router.get("/:bookId",async(req,res)=>{
    try{
        const foundBook = await Book.findById(req.params.bookId)
        console.log(foundBook)
        res.render("books/book-details.ejs",{foundBook: foundBook})
    }
    catch(error){
        console.log(error)
    }
})

// 1. get the book by the id
// 2. add the new comment to the book.comments array
// 3. save the book with the updated comment
// 4. redirect back to the books details

router.post("/:bookId/comment",async(req,res)=>{
    try{
        const foundBook = await Book.findById(req.params.bookId)
        console.log(foundBook)
        foundBook.comments.push(req.body)
        foundBook.save()
        res.redirect(`/books/${foundBook._id}`)

    }
    catch(error){
        console.log(error)
    }
})

// export the router
module.exports = router

// exercise create the author routes