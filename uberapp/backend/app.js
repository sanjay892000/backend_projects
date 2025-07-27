const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDB = require('./database');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/uber/api/v3.2/auth', require('./router/user.routes'))
app.use('/uber/api/v3.2/captain', require('./router/captain.routes'))

module.exports = app;
connectToDB();