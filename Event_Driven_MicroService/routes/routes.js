const express = require('express');
const { getEvents, postProcess, getMetrics } = require('./routes');
const app = express();

app.use(express.json());

app.get('/events', getEvents);
app.post('/process', postProcess);
app.get('/metrics', getMetrics);

module.exports = app;
