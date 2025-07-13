const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register", // your user model
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wanderlust",
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        lowercase: true,
        trim: true
    }
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
