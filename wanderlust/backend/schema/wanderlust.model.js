const { default: mongoose } = require("mongoose");


// schema for comments
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
}, { _id: false, timestamps:true }); // You can keep `_id: true` if you want comment IDs

//wanderlust schema
const wanderlust = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 10,
        maxlength: 150
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
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
        lowercase: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        lowercase: true,
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
    comment: [commentSchema], // Using the comment schema defined above
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
    toObject: { virtuals: true } // Ensure virtuals are included when converting to objects
});


// Virtuals for total counts it means it will not be stored in the database but can be used in queries 
wanderlust.virtual('total_like').get(function () {
    return this.like.length;
}); 

wanderlust.virtual('total_rating').get(function () {
  return this.rating?.length || 0; 
});
wanderlust.virtual('total_comment').get(function () {
  return this.comments?.length || 0; // Use optional chaining to handle cases where comments might be undefined
});


const Wanderlust = mongoose.model('Wanderlust', wanderlust);
module.exports = Wanderlust;