const express = require('express')
const app = express();
const playerRouter = require('./routes/playerRoutes.js');
const connectToDB = require('./database.js');
const cors = require('cors');
require('dotenv').config()


connectToDB();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/indian/cricket/team', playerRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})