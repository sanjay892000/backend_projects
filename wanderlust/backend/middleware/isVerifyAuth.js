require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY;

const isVerifyAuth = async (req, res, next) => {

    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({
            message: 'Access denied, no token provided',
            success: false
        });
    }
    try {
        const auth = jwt.verify(token, secretKey);
        req.user = auth.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: 'Invalid token or token expired',
            success: false
        });
    }

}

module.exports = isVerifyAuth;