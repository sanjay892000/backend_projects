const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    massage:{
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
    }
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;