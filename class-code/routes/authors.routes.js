const Author = require("../models/Author")
const router = require("express").Router()


router.get("/new",(req,res)=>{
    res.render("authors/new.ejs")
})



module.exports = router