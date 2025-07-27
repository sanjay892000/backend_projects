const jwt = require('jsonwebtoken')
require('dotenv').config();


const secretKey = process.env.JWT_SECRET

const isVerifyAuth = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const data = jwt.verify(token, secretKey);
    req.user = data._id;
    next();
}

module.exports = isVerifyAuth;