const { default: mongoose } = require("mongoose");
require('dotenv').config({
    
});
const connectToDB = ()=>{
    mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))
}
module.exports = connectToDB;