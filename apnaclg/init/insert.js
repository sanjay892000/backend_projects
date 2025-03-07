const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require('dotenv').config();
const data = require('./data');
const listingModel = require("../schemas/listing.model");
const PORT = 7000;
const connectToDB= async()=>{
    try {
       await mongoose.connect('mongodb+srv://SanjayAPI:g6WIo4g08DS0jDzd@sanjay.ecryqbg.mongodb.net/apnaclg?retryWrites=true&w=majority')
        console.log("MongoDB Connected to database ");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    }
}
connectToDB();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello World!");
})
app.get('/addlisting', async(req,res)=>{
   try {
    await listingModel.deleteMany({});
    await listingModel.create(data.data);
   res.send('Listing added successfully');
   } catch (error) {
    console.error(`Error adding listing: ${error}`);
   }
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})