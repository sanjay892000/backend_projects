const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');


const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, email, age, password } = req.body;

    try {
        let user = await userModel.findOne({ email })
        if (user) {
            throw new Error('Email already exists!')
        }
        const hashedPassword = await userModel.hashPassword(password);

        user = await userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            age,
            password
        })

        /*   const token = user.generateAuthToken(); */
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email }).select('+password');;
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            user, token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
};


const getUser = async (req, res) => {

    try {
        const user = await userModel.findById(req.user)
        res.status(200).json({
            success: true,
            message: "your profile founded",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }

};


const updateUser = async (req, res) => {  };
const deleteUser = async (req, res) => { };

module.exports = { register, login, getUser, updateUser, deleteUser };

