const jwt = require('jsonwebtoken')
require('dotenv').config();
const blacklistTokenModel = require('../models/blacklistToken.model')

const secretKey = process.env.JWT_SECRET

const isVerifyAuth = async (req, res, next) => {
    /*     const token = req.header('auth-token'); */
    const token = req.cookies.token || req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'You are unauthorized'
        });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({
            success: false,
            message: 'You are unauthorized'
        });
    }
    const user = jwt.verify(token, secretKey);
    req.user = user._id;
    next();
}


module.exports = isVerifyAuth;