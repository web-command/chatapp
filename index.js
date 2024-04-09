const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Middleware to log IP address of incoming requests
app.use((req, res, next) => {
    console.log('Request IP:', req.ip);
    next();
});


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// io.on('connection', (socket) => {
//     console.log('A user connected');


//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//         io.emit('chat message', msg); 
//     });

    
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });


// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Listen for chat messages
//     socket.on('chat message', (data) => {
//         console.log(`${data.name}: ${data.message}`);
//         io.emit('chat message', data); // Broadcast the message to all clients
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (data) => {
        console.log(`${data.name}: ${data.message}`);
        io.emit('chat message', data); // Broadcast the message to all clients
    });

    // Listen for file uploads
    socket.on('chat file', (data) => {
        console.log(`${data.name} sent: ${data.filename}`);
        io.emit('chat file', data); // Broadcast the file data to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });


// Start the server
const PORT = 5025;
const PRIVATE_IP_ADDRESS = '192.168.12.59'; // Change this to your private IP address
server.listen(PORT, PRIVATE_IP_ADDRESS, () => {
    console.log(`Server listening on ${PRIVATE_IP_ADDRESS}:${PORT}`);
});
