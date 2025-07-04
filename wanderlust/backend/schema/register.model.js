const { default: mongoose } = require("mongoose");

const register = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Register = mongoose.model('Register', register);
module.exports = Register;