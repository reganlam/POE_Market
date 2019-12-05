const express = require('express')
const router = express.Router()

const Listing = require('../../models/Listing')


// @route 	GET api/listings/
// @desc 	Get all listings
router.get('/', async(req, res) => {
	try{	
		const listings = await Listing.find().sort({date: -1})

		res.json(listings)
	} catch(err){
		console.error(err.message)
		res.status(500).send('Server Error')
	}
	
})

// @route 	PUT api/listings/:id
// @desc 	Makes listing hasSeen = true
router.put('/:id', async(req, res) => {
	try{	
		const listing = await Listing.findById(req.params.id)

		if(!listing){
			return res.status(404).json({msg: 'Listing not found'})
		}

		listing.hasSeen = true

		await listing.save()

		res.json(listing)
	} catch(err){
		console.error(err.message)
		res.status(500).send('Server Error')
	}
	
})

module.exports = router