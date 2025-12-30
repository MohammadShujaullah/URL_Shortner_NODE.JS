 const express=require("express");
// jitne bhi front end pages han unhe staticRouter bolte han


const router=express.Router();


router.get("/",(req,res)=>{
    return res.render("home");
});




module.exports=router;