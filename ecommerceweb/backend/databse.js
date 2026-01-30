const mongoose = require("mongoose");
require("dotenv").config();
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = connectToDatabase;