const { json } = require('express');
const express = require('express');

const userRoutes = require('./routes/user');
const threadRoutes = require('./routes/thread');
const reactRoutes = require('./routes/react');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/thread', threadRoutes);
app.use('/api/react', reactRoutes);

module.exports = app;