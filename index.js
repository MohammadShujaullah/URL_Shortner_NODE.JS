const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8001;

const path =require("path");

const urlrouter = require("./routes/url");

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




//set view engine for ejs
app.set("view engine","ejs");
//set view directory for ejs files 
app.set("views",path.resolve("./views"));



// test route to check all urls in db and their visit counts at /test    
app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});

    return res.end(
        ` <html><head></head>
<body>
    <ol>
        ${allUrls.map((url) =>
            `<li>${url.shortId}:${url.redirectUrl}->${url.visitHistory.length}</li>`
        ).join("")}
    </ol>
</body>
        </html>
    `)
})




//routes
app.use("/url", urlrouter);           //all routes related to url will be handled by urlrouter


app.use("/", urlrouter); //route for handling short URL visits

app.use("/", urlrouter); //route for handling analytics requests



app.listen(port, () => {
    console.log(`server is running at port:${port}`);

})