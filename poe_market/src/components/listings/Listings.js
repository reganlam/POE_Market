import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// from file
import {getListings} from '../../actions/listing'
import Timer from './Timer'

// const getListedDate = (date) => {
// 	const listing_date = new Date(Date.parse(date))
// 	const current_date = new Date()

// 	if(listing_date.getDate() != current_date.getDate() || 
// 		listing_date.getMonth() != current_date.getMonth() || 
// 		listing_date.getYear() != current_date.getYear()){
// 		return ('Listed days ago')
// 	}

// 	const hours = (current_date.getHours() - listing_date.getHours())

// 	const minutes = ( 
// 		hours * 60 + (current_date.getMinutes() - listing_date.getMinutes())
// 	)

// 	if (minutes >= 60) {
// 		return (`Listed ${hours} hours ago`)
// 	}

// 	return (`Listed ${minutes} minutes ago`)
// }

const Listings = ({getListings, listing: {listings, loading}}) => {
	useEffect(() => {
		document.title = `(${listings.length}) POE`
		getListings()
	}, [getListings])

 
	return (
		<Fragment>
			<div class ='container text-left listings'>
				{listings.map(listing => (
					<Fragment>
						<div class ='row'>
							<h6><Timer date={listing.created_at}/></h6>
						</div>
						<div key={listing._id} class='row listing'>
							<h6 class = 'col-2'>
								{listing.name}
							</h6>
							<h6 class = 'col-2 price'>
								{listing.price} 
								{' '}
								{listing.currency}
							</h6>
							<h6 class = 'col-8'>
								{listing.whisper}
							</h6>
						</div>
					</Fragment>
				))}
			</div>
		</Fragment>
	)
}

Listings.propTypes = {
	getListings: PropTypes.func.isRequired,
	listing: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	listing: state.listing
})

export default connect(mapStateToProps, {getListings})(Listings)