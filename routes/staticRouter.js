// jitne bhi front end pages han unhe staticRouter bolte han
const express = require("express");

const{restrictTo}=require("../middleware/auth");
const URL = require("../models/url");

const router = express.Router();

router.get("/admin/urls",restrictTo(["ADMIN"]),async(req,res)=>{

  if(!req.user){
    return res.redirect("/login");
  }
  const allUrls = await URL.find({}); // fetch all URLs created by the logged-in user only

  return res.render("home", {
    urls: allUrls
  });
})


router.get("/",restrictTo(["ADMIN","NORMAL"]), async (req, res) => {
  if(!req.user){
    return res.redirect("/login");
  }
  const allUrls = await URL.find({ createdBy:req.user._id}); // fetch all URLs created by the logged-in user only

  return res.render("home", {
    urls: allUrls
  });
});



router.get("/signup", (req, res) => {
  return res.render("signup");
})


router.get("/login",(req,res)=>{

  return res.render("login");
})

module.exports = router;