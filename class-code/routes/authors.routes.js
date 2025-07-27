const Author = require("../models/Author")
const router = require("express").Router()


router.get("/new",(req,res)=>{
    res.render("authors/new.ejs")
})

router.post("/",async(req,res)=>{
    try{
        const createdAuthor = await Author.create(req.body)
        res.redirect("/authors/new")
    }
    catch(error){
        console.log(error)
    }
})



module.exports = router