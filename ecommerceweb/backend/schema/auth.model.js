const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, 'Enter a valid email!']
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Enter a valid phone!'],
        default: null
    },
    gender: {
        type: String,
        enum: ["male", "female", ""],
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/sanjay892000/image/upload/pngegg_sdm4zb.png",
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    address: [{
        street: String,
        city: String,
        state: String,
        pincode: String
    }]
}, { timestamps: true });

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;