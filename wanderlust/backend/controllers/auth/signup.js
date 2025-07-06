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
                message: "User already exists",
                success: false
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
            message: "User created successfully",
            success: true,
            auth: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }

}

module.exports = signupFun;