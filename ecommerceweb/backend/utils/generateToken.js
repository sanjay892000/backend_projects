const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie("token", token, {
        httpOnly: true, // accessible only by web server
        secure: process.env.NODE_ENV === "production", // https only in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match token expiry
    });
}

module.exports = generateToken;