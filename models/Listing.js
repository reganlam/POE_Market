const mongoose = require('mongoose')

// id, name, type, whisper, price, currency, date
const ListingSchema = new mongoose.Schema({
	listing_id: {
		type: String,
		required: true
	},
	name:{
		type: String,
		default: ""
	},
	type:{
		type: String,
		required: true
	},
	whisper:{
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	currency:{
		type: String,
		required: true
	},
	link:{
		type: String,
		required: true
	},
	hasSeen:{
		type: Boolean,
		default: false
	},
	created_at:{
		type: Date,
		required: true
	}
})

module.exports = Listing = mongoose.model('listing', ListingSchema)