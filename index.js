// packages
const Bottleneck = require("bottleneck/es5")
const fetch = require("node-fetch")
const mongoose = require('mongoose')
const glob = require('glob')

// from file
const connectDB = require('./config/db')
const Listing = require('./models/Listing')

const item1 = require('./filters/xoph_blood')
const item2 = require('./filters/circle_of_fear')

const query_limiter = new Bottleneck({
	maxConcurrent: 2,
	minTime: 550
})

const results_limiter = new Bottleneck({
	maxConcurrent: 4,
	minTime: 260
})

// Returns {listings, id}
const get_all_listings = async(item) => {
	const url = 'https://www.pathofexile.com/api/trade/search/Standard'

	try{
		let res = await fetch(url, {
			method: "POST",
			headers:{'Content-Type': 'application/json'},
			body: JSON.stringify(item.filter)
		})

		res = await res.json()
		return {listings: res.result, id: res.id}
	} catch(err){
		console.error('Error:', err)
	}
}

// Check if listings is under threshold
const check_listings = async(item) => {
	const {listings, id} = await get_all_listings(item)

	const {price, currency} = item

	console.log('Searching:', item.name + ` (${listings.length} Listings)`)

	// Looping from lowest to highest priced listings
	for(let i = 0; i < listings.length; i++){
		const url =`https://www.pathofexile.com/api/trade/fetch/${listings[i]}?query=${id}`

		try{
			let res = await fetch(url, {
				method: "GET"
			})

			res = await res.json()
			res = res.result[0]

			const listing_data = {
				id: res.id,
				name: res.item.name,
				type: res.item.typeLine,
				whisper: res.listing.whisper,
				price: res.listing.price.amount,
				currency: res.listing.price.currency
			}

			// compare prices
			if(currency == listing_data.currency && price < listing_data.price){
				console.log('Breaking:', listing_data.name)
				break
			} 

			// Check for dup / save into DB
			let listing = await Listing.findOneAndUpdate(
				{listing_id: listing_data.id}, 
				{
					name: listing_data.name, 
					type: listing_data.type, 
					whisper: listing_data.whisper,
					price: listing_data.price,
					currency: listing_data.currency
				},
				{new: true, upsert: true}
			)

			console.log(`FOUND: ${listing_data.name}: ${listing_data.price} ${listing_data.currency}`)

		} catch(err){
			console.error('Error:', err)
		}
	}
}

const snipe = async() => {

	results_limiter.schedule(() => check_listings(item1))
	results_limiter.schedule(() => check_listings(item2))
	// results_limiter.schedule(() => check_listings(listings, id, item))
	// results_limiter.schedule(() => check_listings(listings, id, item))
}

connectDB()
const db = mongoose.connection
db.once('open', () => {

	glob('./filters/*.json', (err, files) => {
	    if (err) {
	        console.log(err);
	    } else {
	        console.log(files);
	    }
	});
})
