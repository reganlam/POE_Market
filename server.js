const express = require('express')
const connectDB = require('./config/db')
const io = require('socket.io')();
const app = express()

const SOCKET_PORT = 8000;
const SERVER_PORT = 5000;

// connect database
connectDB();

// default
app.get('/', (req, res) => res.send('API running'))

// routes
app.use('/api/listings', require('./routes/api/listings'))

// listen
app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}...`))


io.on('connection', socket => {
	socket.on('INSERTED_LISTING', state => {
		console.log('INSERTED_LISTING')
		io.sockets.emit('UPDATED_LISTINGS')
	})
});

io.listen(SOCKET_PORT);
console.log(`Socket running on port ${SOCKET_PORT}...`);

