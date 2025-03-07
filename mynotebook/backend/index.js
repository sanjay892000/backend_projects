const connectToMongoDB = require("./database");
const express = require("express");
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT_NO;

connectToMongoDB();
app.use(cors());
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
app.get('/',async(req,res)=>{
    res.send('Hello World');
})

app.use('/api/users',require('./routers/users.routers'))
app.use('/api/notes',require('./routers/notes.routers'))
app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})