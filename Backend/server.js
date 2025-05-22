const express = require('express');
const connectDB = require('./config/db');
const noteRoutes = require('./Routes/noteRoute');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const app = express();
connectDB(); // Connect to MongoDB

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', noteRoutes);

// Create HTTP server
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
