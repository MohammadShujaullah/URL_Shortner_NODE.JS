const { v4: uuidv4 } = require("uuid");

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




    const sessionId = uuidv4();   // Generate a unique session ID,downloaded from uuid package

    setUser(sessionId, user);  // Store the user against the session ID

    res.cookie("uid", sessionId);    // Set a cookie in the user's browser with the session ID




    return res.redirect("/");

}




module.exports = { handleUserSignup, handleUserLogin };

