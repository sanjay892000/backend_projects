const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const secretKey = process.env.JWT_SECRET;


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false // Do not return password in queries
    },
    gender: {
        type: String,
        enum: ['male', 'female', ""],
        default: ""
    },
    socketId: {
        type: String,
        default: null
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    city: {
        type: String,
        trim: true,
        default: null
    },
    state: {
        type: String,
        trim: true,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    zip: {
        type: String,
        trim: true,
        default: null
    }
}, { timestamps: true });


//Jab tumhe function specific user/document ke upar call karna ho → use methods
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, secretKey, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//Jab tumhe function model pe directly call karna ho → use statics
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model('User', userSchema);
module.exports = User;