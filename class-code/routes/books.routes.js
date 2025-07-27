// import the model
const Book = require("../models/Book")
// import the router
const router = require("express").Router()



// write your routes

router.get("/new",(req,res)=>{
    res.render("books/new.ejs")
})



// export the router
module.exports = router

// exercise create the author routes