const express = require('express');
const app = express();
const http = require('http');

const {Server} = require('socket.io')


// create http server
const httpServer = http.createServer(app); // ye http server, express app ko handle karega aur socket.io ko http server chahiye hota hai

// create socket.io server

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
}); // ye socket.io server hai jo http server ke upar bana hai it mean socket.io ab http server ke through communicate karega

io.on('connection', (socket) => {
    console.log('a user connected with id:', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected with id:', socket.id);
    });
});

module.exports = { app, io, httpServer};