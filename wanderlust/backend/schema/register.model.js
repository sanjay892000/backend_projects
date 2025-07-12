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
    avatar:{
        type: String,
        default: "https://res.cloudinary.com/sanjay892000/image/upload/pngegg_sdm4zb.png",
        trim: true
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    password: {
        type: String,
        required: true
    },
    terms_condition:{
        type:Boolean,
        default:false
    }

}, { timestamps: true });

const Register = mongoose.model('Register', register);
module.exports = Register;