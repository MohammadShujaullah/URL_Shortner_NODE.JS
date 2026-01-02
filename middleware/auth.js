const { getUser } = require("../service/auth");

async function restrictToLoginUserOnly(req, res, next) {
    const userUid = req.headers["authorization"];  //get the authorization header from the request
                                                   //***means client sends token to server in Authorization header and if token matches with the token we set during login then only user is authenticated
    if (!userUid) {                   // if user has no authorization header, then redirect to login page
        return res.redirect("/login");
    }

    // Check if the header starts with "Bearer " and extract the token
    if (!userUid.startsWith("Bearer ")) {
        return res.redirect("/login");
    }
    
    const token = userUid.split("Bearer ")[1];    // seems to be like" Bearer <token>",  then [Bearer,<token>] so we want only <token> part,then takes [1] 1st index element 
    
    if (!token) {
        return res.redirect("/login");
    }
    
    const user = getUser(token);
    if (!user) {                  // agr user hi nahi mila to fir se login page pr bhej do
        return res.redirect("/login");
    }

    req.user = user;
    next();

}

// only those Urls related to logged in user will be seen on the home page of the user
// for this we made this function

async function checkAuth(req,res,next) {
    const userUid = req.headers["authorization"];  //get the authorization header from the request

    // If no authorization header, set req.user to null and continue (non-blocking)
    if (!userUid || !userUid.startsWith("Bearer ")) {
        req.user = null;
        return next();
    }

    const token = userUid.split("Bearer ")[1];    // seems to be like" Bearer <token>",  then [Bearer,<token>] so we want only <token> part,then takes [1] 1st index element 
    const user = getUser(token);

    req.user = user;
    next();

}

module.exports = { restrictToLoginUserOnly ,checkAuth};