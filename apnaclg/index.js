const express = require("express");
const app = express();
const connectToDB = require("./database");
require('dotenv').config();
const listingRouter = require('./routes/listing.router.js')
const path = require('path');
engine = require('ejs-mate');


const PORT = process.env.PORT_NO
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);

app.use('/', listingRouter);

app.get('*', (req, res) => {
    res.send("Error page!");
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})