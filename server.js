const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io')
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const { use } = require('chai');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Serve static files from React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

mongoose.connect('mongodb+srv://' + process.env.username + ':' + process.env.dbpass + '@cluster0-h137k.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewURLParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running port:8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New socket!');
});

app.use((req, res) => {
    res.status(404).json('Not found...')
});

module.exports = server;