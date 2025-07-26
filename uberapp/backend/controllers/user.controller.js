const { validationResult } = require('express-validator');
const { registerService } = require('../services/user.service');
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

        user = await registerService({
            firstname, lastname, email, age, password: hashedPassword
        })

        const token = user.generateAuthToken();
        res.status(201).json({
            success: true,
            user, token,
            message: 'User created successfully!'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
};
const login = async (req, res) => { };
const getUser = async (req, res) => { };
const updateUser = async (req, res) => { };
const deleteUser = async (req, res) => { };

module.exports = { register, login, getUser, updateUser, deleteUser };

