const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectToDB = require('./database')

const port = process.env.PORT || 8000;

connectToDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});






app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})
