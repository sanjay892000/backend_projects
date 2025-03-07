const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    age:{
        type: 'number',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    contact: {
        type: 'number',
        required: true
    },
    address: {
        type: 'string',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

})

const UserForm = mongoose.model('UserForm', formSchema)

module.exports = UserForm;

