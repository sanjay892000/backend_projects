const { default: mongoose } = require("mongoose");
require('dotenv').config()

const connectToDB= async()=>{
    try {
       await mongoose.connect(process.env.DB_URI)
        console.log("MongoDB Connected to database ");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
}
module.exports = connectToDB;