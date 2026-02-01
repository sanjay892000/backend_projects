const express = require('express');
const router = express.Router();
const authModel = require('../schema/auth.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authVerification = require('../middleware/authverification.middleware');
const generateToken = require('../utils/generateToken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
        return res.status(404).json({ success: false, message: "All fields are required!" })
    }
    try {
        let user = await authModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        user = await authModel.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(201).json({
            success: true,
            message: "Account created successfully!",
            user: user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(404).json({ success: false, message: "All fields are required!" })
    }
    try {
        let user = await authModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const data = await bcrypt.compare(password, user.password)
        if (!data) {
            return res.status(400).json({ success: false, message: "Invalid email or password" })
        }
        generateToken(user._id, res);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: user
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging in user" })
        console.log(error)
    }
});

router.post('/logout', authVerification, (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        success: true,
        message: "User logged out successfully!"
    });
});




router.get('/profile', authVerification, async (req, res) => {
    try {
        const user = await authModel
            .findById(req.user)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching profile"
        });
    }
});

router.put('/profile', authVerification, async (req, res) => {
    try {
        const { name, phone, gender, avatar, address } = req.body || {};

        const updateFields = {};
        if (name) updateFields.name = name;
        if (phone) updateFields.phone = phone;
        if (gender) updateFields.gender = gender;
        if (avatar) updateFields.avatar = avatar;
        if (address) updateFields.address = address;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update"
            });
        }

        const updatedUser = await authModel.findByIdAndUpdate(
            req.user,
            updateFields,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error updating profile"
        });
    }
});


router.delete('/profile', authVerification, async (req, res) => {
    try {
        const user = await authModel.findByIdAndDelete(req.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting account"
        });
    }
});


module.exports = router;