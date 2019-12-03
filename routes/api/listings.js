const express = require('express')
const router = express.Router()

const Listing = require('../../models/Listing')

router.get('/', async(req, res) => {
	try{	
		const listings = await Listing.find().sort({date: -1})

		res.json(listings)
	} catch(err){
		console.error(err.message)
		res.status(500).send('Server Error')
	}
	
})

module.exports = router