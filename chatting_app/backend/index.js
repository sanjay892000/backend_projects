const cors = require('cors');
const express = require('express');
require('dotenv').config();
const connectToDB = require('./database')
const cookieParser = require('cookie-parser');
const { app, httpServer } = require('./socket/socket.io');

const port = process.env.PORT || 8000;

connectToDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./router/auth.routes'));
app.use('/api/users', require('./router/users.routes'));
app.use('/api/message', require('./router/message.routes'));

/* app.get('/', (req, res) => {
    res.send('Hello World!')
}); */

httpServer.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})
