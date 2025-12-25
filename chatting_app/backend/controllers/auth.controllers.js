require('dotenv').config();
const UserModel = require('../schema/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY;

const signupAuth = async (req, res) => {
    const { name, username, email, gender, password, } = req.body;

    try {

        if (!name || !username || !email || !gender || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        const usernameExists = await UserModel.findOne({ username: username });
        if (usernameExists) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }


        const emailExists = await UserModel.findOne({ email: email });
        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const maleAvatar = "https://avatar.iran.liara.run/public/boy"
        const femaleAvatar = "https://avatar.iran.liara.run/public/girl"

        let avatar = "https://res.cloudinary.com/sanjay892000/image/upload/pngegg_sdm4zb.png"

        if (gender === 'male') {
            avatar = maleAvatar;
        }
        else if (gender === 'female') {
            avatar = femaleAvatar;
        }

        const newUser = await UserModel.create({
            name,
            username,
            email,
            gender,
            avatar,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Your account has been created successfully",
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


const loginAuth = async (req, res) => {

    const { loginId, password } = req.body;

    try {
        if (!loginId || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await UserModel.findOne({ $or: [{ email: loginId }, { username: loginId }] });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "invalid email or password"
            });
        }


        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '15d' });
        res.cookie('token', token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'strict' });

        res.status(201).json({
            success: true,
            message: "login successfully ",
            auth: user
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }


}

const getAuth = async (req, res) => {
    try {
        const userId = req.user
        const auth = await UserModel.findById(userId);

        if (!auth) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User profile accessed successfully',
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

const updateAuth = async (req, res) => {
    try {
        const userId = req.user;
        const { name, username, email, gender, phone } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.gender = gender || user.gender
        user.phone = phone || user.phone;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            auth: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

const deleteAuth = async (req, res) => {
    try {
        const userId = req.user;
        const auth = await UserModel.findByIdAndDelete(userId);
        if (!auth) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'your account has been deleted successfully',
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

module.exports = { signupAuth, loginAuth, getAuth, updateAuth, deleteAuth };