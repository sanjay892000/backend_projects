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
        required: true,
        trim: true
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
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
    }

}, { timestamps: true });

/* wanderlust.virtuals = {
    likesCount: {
        get() {
            return this.like.length;
        }
    }
}; */

wanderlust.virtual('likesCount').get(function() {
    return this.like.length;
});

const Wanderlust = mongoose.model('Wanderlust', wanderlust);
module.exports = Wanderlust;