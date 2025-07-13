require('dotenv').config();
const registerModel = require('../../schema/register.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY;

const getAuth = async (req, res) => {
    try {
        const userId = req.user
        const auth = await registerModel.findById(userId);

        if (!auth) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User authenticated',
            auth: auth
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = getAuth;