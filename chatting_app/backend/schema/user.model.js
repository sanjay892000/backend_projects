const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [4, 'Username must be at least 4 characters long'],
        match: [/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, 'Usernames can contain characters a-z, 0-9, underscores and periods']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/, 'invalid email']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other'
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/sanjay892000/image/upload/pngegg_sdm4zb.png",
        trim: true
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;