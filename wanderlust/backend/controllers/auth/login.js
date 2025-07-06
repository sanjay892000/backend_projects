require('dotenv').config();
const registerModel = require('../../schema/register.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY;

const loginFun = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await registerModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "invalid email or password",
                status: false
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({
                message: "invalid email or password",
                status: false
            });
        }

        const token = jwt.sign({ id: user._id }, secretKey);
        res.status(201).json({
            message: "login successfully ",
            status: true,
            auth: user,
            token: token
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }


}

module.exports = loginFun;