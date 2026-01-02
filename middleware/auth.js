const { getUser } = require("../service/auth");

async function restrictToLoginUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;  //get the uid cookie from the request,the nae uid comes from ../controllers/user.js where we set the cookie

    if (!userUid) {                // if user has no uid cookie, then redirect to login page
        return res.redirect("/login");


    }

    const user = getUser(userUid);
    if (!user) {                  // agr user hi nahi mila to fir se login page pr bhej do
        return res.redirect("/login");
    }

    req.user = user;
    next();

}

// only those Urls related to logged in user will be seen on the home page of the user
// for this we made this function

async function checkAuth(req,res,next) {
    const userUid = req.cookies?.uid;  //get the uid cookie from the request,the name uid comes from ../controllers/user.js where we set the cookie



    const user = getUser(userUid);


    req.user = user;
    next();

}

module.exports = { restrictToLoginUserOnly ,checkAuth};