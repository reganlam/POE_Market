// packages
const Bottleneck = require("bottleneck/es5")
const fetch = require("node-fetch")
const mongoose = require('mongoose')

// from file
const connectDB = require('./config/db')
const Listing = require('./models/Listing')
const item = require('./xoph_blood.js')

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
			body: JSON.stringify(item.data.filter)
		})

		res = await res.json()
		return {listings: res.result, id: res.id}
	} catch(err){
		console.error('Error:', err)
	}
}

// Check if listings is under threshold
const check_listings = async(listings, id, item) => {

	const {price, currency} = item.data

	console.log('Searching:', item.data.name + ` (${listings.length} Listings)`)
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
			if(currency == listing_data.currency){
				if(listing_data.price <= price){

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
				} else {
					console.log('Breaking:', listing_data.name)
					break
				}
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

const snipe = async(item) => {
	const {listings, id} = await get_all_listings(item)

	results_limiter.schedule(() => check_listings(listings, id, item))
	results_limiter.schedule(() => check_listings(listings, id, item))
	// results_limiter.schedule(() => check_listings(listings, id, item))
	// results_limiter.schedule(() => check_listings(listings, id, item))
}

connectDB()
const db = mongoose.connection
db.once('open', () => {
	snipe(item)
})
