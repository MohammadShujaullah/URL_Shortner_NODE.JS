 const express=require("express");


const router=express.Router();

const {handlegenerateShortURL,handleVisitThroughShortURL,handleGetAnalytics}=require("../controllers/url");

const URL=require("../models/url");

router.post("/",handlegenerateShortURL);
router.get("/:shortId",handleVisitThroughShortURL);

router.get("/analytics/:shortId",handleGetAnalytics)
module.exports=router;
