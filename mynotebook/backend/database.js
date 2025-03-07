const {mongoose} = require("mongoose");
require('dotenv').config();
const connectToMongoDB =async ()=>{
 try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
 } catch (error) {
     console.log('connection faild' + error);
 }
}
module.exports = connectToMongoDB;