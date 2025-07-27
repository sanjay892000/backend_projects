const jwt = require('jsonwebtoken')
require('dotenv').config();
const userModel = require('../models/user.model')

const secretKey = process.env.JWT_SECRET

const isVerifyAuth = async (req, res, next) => {
    const token = req.header('auth-token');
    /*  const token = req.cookies.token || req.headers.authorization.split(" ")[1]; */
    if (!token) {
        return res.status(401).json({ message: 'You are unauthorized' });
    }
    const user = jwt.verify(token, secretKey);
    req.user = user._id;
    next();
}

module.exports = isVerifyAuth;