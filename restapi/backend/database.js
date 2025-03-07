const { default: mongoose } = require("mongoose");
require('dotenv').config();


const connectToDB = async () => {
 try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to DB');
 } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
 }
}

module.exports = connectToDB;