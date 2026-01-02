const { setUser } = require("../service/auth");
const User = require("../models/user");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    })

    if (!User) {
        return res.status(500).json({ error: "Signup failed" });
    }

    return res.redirect("/");

}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({

        email,
        password
    })

    if (!user) {
        return res.render("login", { error: "Invalid credentials" });
    }




 
    const token = setUser(user);  // Store the user against the session ID

    res.cookie("uid", token, {
        httpOnly: true,  // Prevents JavaScript access to cookie (security)
        secure: false,   // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000  // Cookie expires in 24 hours
    });    // Set a cookie in the user's browser now with the token




    return res.redirect("/");

}




module.exports = { handleUserSignup, handleUserLogin };

