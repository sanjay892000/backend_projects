const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model')

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, email, age, gender, vehicle, password } = req.body;
    const { color, plate, capacity, vehicleType } = vehicle || {};

    try {
        let captain = await captainModel.findOne({ email })
        if (captain) {
            throw new Error('Email already exists!')
        }
        const hashedPassword = await captainModel.hashPassword(password);

        captain = await captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            gender,
            age,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            },
            password: hashedPassword
        })

        /*   const token = captain.generateAuthToken(); */
        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            captain
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
        let captain = await captainModel.findOne({ email }).select('+password');;
        if (!captain) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isValidPassword = await captain.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token)
        res.status(200).json({
            success: true,
            message: 'Logged in successfully!',
            captain, token
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
        const user = await captainModel.findById(req.user)
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
    const { firstname, lastname, email, age, gender, phone, vehicle, oldpassword, newpassword, address, city, state, country, zip, social } = req.body;
    const { color, plate, capacity, vehicleType } = vehicle || {};

    try {
        const captain = await captainModel.findById(req.user);
        if (firstname || lastname) {
            captain.fullname = {};
            if (firstname) captain.fullname.firstname = firstname;
            if (lastname) captain.fullname.lastname = lastname;
        };
        if (email) captain.email = email;
        if (age) captain.age = age
        if (gender) captain.gender = gender;
        if(vehicle){
            if(color) captain.vehicle.color = color;
            if(plate) captain.vehicle.plate = plate;
            if(capacity) captain.vehicle.capacity = capacity;
            if(vehicleType) captain.vehicle.vehicleType = vehicleType;
        }
        if (phone) captain.phone = phone;
        if (oldpassword && newpassword) {
            const isValidPassword = await captain.comparePassword(oldpassword);
            if (!isValidPassword) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            const hashedPassword = await captainModel.hashPassword(newpassword);
            captain.password = hashedPassword;
        }
        if (address) captain.address = address;
        if (city) captain.city = city;
        if (state) captain.state = state;
        if (country) captain.country = country;
        if (zip) captain.zip = zip;
        if (social) captain.social = social;

        const updatedcaptain = await captain.save()

        res.status(200).json({
            success: true,
            message: "your profile updated successfully!",
            user: updatedcaptain
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
        const user = await captainModel.findByIdAndDelete(req.user);
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

