const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8001;

//import path module used for ejs view engine
const path =require("path");

const urlrouter = require("./routes/url");

const staticRoute=require("./routes/staticRouter");


const URL = require("./models/url");


//import connect to mongodb function
const { connectToMongoDB } = require("./connect");

mongoose.set('strictQuery', true);
//connect to mongodb
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("mongodb connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));




//middleware use for json parsing 
app.use(express.json());


// middleware to parse the data comming from the form submit in the view file
app.use(express.urlencoded({ extended: true }));



//set view engine for ejs
app.set("view engine","ejs");
//set view directory for ejs files 
app.set("views",path.resolve("./views"));



//routes
app.use("/url", urlrouter);           //all routes related to url will be handled by urlrouter


app.use("/", urlrouter); //route for handling short URL visits

 app.use("/", urlrouter); //route for handling analytics requests


app.use("/",staticRoute); // routes for the handling for the static pages like home page, about page etc


app.listen(port, () => {
    console.log(`server is running at port:${port}`);

})