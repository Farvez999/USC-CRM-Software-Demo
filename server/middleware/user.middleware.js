const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const verifyAccessToken = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token && token.startsWith("Bearer ")) {
            try {
                token = token.split(" ")[1];

                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
                req.user = await User.findById(decoded.id);
                next();
            }
            catch (err) {
                return res.status(401).json({ message: "Unauthorized user" });
            }
        }
        else {
            return res.status(400).json({ message: "Invalid request" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}



module.exports = verifyAccessToken
