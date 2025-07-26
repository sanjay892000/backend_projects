require('dotenv').config();
const mongoose = require('mongoose');

const dbUri = process.env.BD_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectToDB;

