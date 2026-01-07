const { getUser } = require("../service/auth");


function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.uid;  //get the uid cookie from the request, the name uid comes from ../controllers/user.js where we set the cookie
    req.user = null;
    if (!tokenCookie) {
        return next();
    }

    const token = tokenCookie;
    const user = getUser(token);


    req.user = user;

    return next();
}



// only those Urls related to logged in user will be seen on the home page of the user
function restrictTo(roles = []) {

    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");    // if user is not logged in, redirect to login page

        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");

        }

        return next();


    }

}

  

module.exports = { checkForAuthentication, restrictTo };