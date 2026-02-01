const express = require("express");
const connectToDB = require("./databse");
const app = express();
const ProductRouter = require('./router/product.router')
const cors = require('cors');
require("dotenv").config();
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 8000;
connectToDB();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(cookieParser());

app.use(express.json());

// app.get("/", (req, res) => {
//   console.log(req.method);
//   res.send("Hello Users!");
// });

app.use('/api/v3.2/product', ProductRouter)

app.use('/api/v3.2/auth', require('./router/auth.router'))


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
