const mongoose = require('mongoose')

// from file
const connectDB = require('./config/db')
const Listing = require('./models/Listing')

// delete all documents from listing
const clearListings = async () => {
	await Listing.remove({})
} 


connectDB()
const db = mongoose.connection
db.once('open', () => {
	clearListings()
})