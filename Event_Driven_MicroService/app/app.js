const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const startEventListener = require('./src/events');
const routes = require('./src/routes');

// Initialize the application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
const connectDatabase = async () => {
    try {
        const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/event_service';
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

// Redis connection
const connectRedis = async () => {
    const client = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
    client.on('error', (err) => console.error('Redis connection error:', err));
    await client.connect();
    console.log('Connected to Redis');
    return client;
};

// Routes
app.use('/api', routes);

// Start the application
const startApp = async () => {
    try {
        // Initialize database and redis
        await connectDatabase();
        const redisClient = await connectRedis();
        app.locals.redisClient = redisClient;

        // Start event listener
        startEventListener();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the app:', err);
        process.exit(1);
    }
};

// Start the application
startApp();
