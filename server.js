const express = require('express')
const connectDB = require('./config/db')

const app = express()

// connect database
connectDB();

// default
app.get('/', (req, res) => res.send('API running'))

// routes
app.use('/api/listings', require('./routes/api/listings'))

// listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))