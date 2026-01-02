const jwt = require("jsonwebtoken");

const secret = "Shuja$123@$"

function setUser(user) {

    return jwt.sign({
        _id: user._id.toString(),  // Convert Mongoose ObjectId to string
        email: user.email,
    }, secret)



}

function getUser(token) {
    if(!token){
        return null;
    }
    try{
    return jwt.verify(token, secret);

    }catch(error){
        return null;
    }

}

module.exports = {
    setUser,
    getUser
}