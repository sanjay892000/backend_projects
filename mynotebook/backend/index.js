const express = require('express');
const connectToDB = require('./database');
const app = express();
const cors = require('cors')
// const dotenv = require('dotenv')
// dotenv.config()

require('dotenv').config()

const PORT = process.env.PORT;

connectToDB()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "welcome to Home Page"
    })
})

app.use("/api/v3.2/auth", require('./router/user.router'))

// app.use("/api/v3.2/note", require('./router/note.router'))

// app.use("/api/v3.2/contact", require('./router/contact.router'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
