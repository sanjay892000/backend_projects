const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    subject:{
        type: String,
        required: true,
        trim: true,
    },
    massage:{
        type: String,
        required: true,
        trim: true,
    }
},{timestamps: true});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;