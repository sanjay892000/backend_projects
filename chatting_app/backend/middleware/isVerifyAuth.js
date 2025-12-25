require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../schema/user.model');
const secretKey = process.env.SECRET_KEY;

const isVerifyAuth = async (req, res, next) => {

    // get token from cookies

    const token = req.cookies.token || req.header('token');

    try {
        if (!token) {
            return res.status(401).json({
                message: 'Access denied, no token provided',
                success: false
            });
        }

        const auth = jwt.verify(token, secretKey);

        if (!auth) {
            return res.status(401).json({
                message: 'Invalid token or token expired',
                success: false
            });
        }

        const user = await userModel.findById(auth.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        req.user = user._id;

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