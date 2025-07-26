const http = require('http');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT;


/* app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
}); */


const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
