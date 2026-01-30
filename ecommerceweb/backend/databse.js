const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://SanjayAPI:g6WIo4g08DS0jDzd@sanjay.ecryqbg.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = connectToDatabase;