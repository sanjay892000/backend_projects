const connectToDB = require("./database");
const express = require("express");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello World! \n Welcome to the Home Page')
})

app.use('/api/notes',require("./routes/contact.routes"))

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})