// filepath: /backend/server.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: 'https://aegis-vault.github.io' }));
app.use(bodyParser.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Example Endpoint
app.post('/api/scan', (req, res) => {
    const { email, contractCode } = req.body;
    if (!email || !contractCode) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    res.status(200).json({ message: 'Scan initiated' });
});

// Socket.io Setup
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg); // Broadcast message
    });
    socket.on('disconnect', () => console.log('User disconnected'));
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
