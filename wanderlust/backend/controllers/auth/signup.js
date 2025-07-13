require('dotenv').config();
const registerModel = require('../../schema/register.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signupFun = async (req, res) => {
    const { name, email, password, terms_condition } = req.body;

    try {
        const user = await registerModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await registerModel.create({
            name,
            email,
            password: hashedPassword,
            terms_condition
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            auth: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

}

module.exports = signupFun;