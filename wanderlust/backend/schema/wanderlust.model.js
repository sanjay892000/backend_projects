const { default: mongoose } = require("mongoose");

const wanderlust = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
    }],
    rating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating"
    }],
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

/* wanderlust.virtuals = {
    likesCount: {
        get() {
            return this.like.length;
        }
    }
}; */

wanderlust.virtual('total_like').get(function () {
    return this.like.length;
});

const Wanderlust = mongoose.model('Wanderlust', wanderlust);
module.exports = Wanderlust;