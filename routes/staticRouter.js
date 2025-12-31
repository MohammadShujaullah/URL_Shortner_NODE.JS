 const express=require("express");
// jitne bhi front end pages han unhe staticRouter bolte han

const URL=require("../models/url");


const router=express.Router();


router.get("/",async(req,res)=>{

    const allUrls= await URL.find({});

    return res.render("home",{
      urls:allUrls
    });
});











module.exports=router;