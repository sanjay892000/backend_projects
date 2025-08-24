const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model')

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, email, phone, password } = req.body;

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
            phone,
            password: hashedPassword
        })

        /*   const token = user.generateAuthToken(); */
        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
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
        res.cookie('token', token)
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

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.header('auth-token');
        await blacklistTokenModel.create({ token })
        res.status(200).json({
            success: true,
            message: 'Logged out successfully!',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getProfile = async (req, res) => {
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

const updateProfile = async (req, res) => {
    const { firstname, lastname, email, gender, phone, oldpassword, newpassword, address, city, state, country, zip } = req.body;

    try {
        const user = await userModel.findById(req.user);
        if (firstname || lastname) {
            if (firstname) user.fullname.firstname = firstname;
            if (lastname) user.fullname.lastname = lastname;
        };
        if (email) user.email = email;
        if (gender) user.gender = gender;
        if (phone) user.phone = phone;
        if (oldpassword && newpassword) {
            const isValidPassword = await user.comparePassword(oldpassword);
            if (!isValidPassword) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            const hashedPassword = await userModel.hashPassword(newpassword);
            user.password = hashedPassword;
        }
        if (address) user.address = address;
        if (city) user.city = city;
        if (state) user.state = state;
        if (country) user.country = country;
        if (zip) user.zip = zip;

        const updateduser = await user.save()

        res.status(200).json({
            success: true,
            message: "your profile updated successfully!",
            user: updateduser
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

const deleteProfile = async (req, res) => {

    try {
        const user = await userModel.findByIdAndDelete(req.user);
        res.status(200).json({
            success: true,
            message: "your account deleted successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    };

};

module.exports = { register, login, getProfile, updateProfile, deleteProfile, logout };

