const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET;

const authVerification = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access! No token provided." });
    }
    try {
        const auth = jwt.verify(token, JWT_SECRET);
        req.user = auth.id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
}

module.exports = authVerification;