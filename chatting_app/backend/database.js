const { default: mongoose } = require("mongoose");
require('dotenv').config();


const URI = process.env.DB_URI
const conectToDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}
module.exports = conectToDB;

