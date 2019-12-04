import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// from file
import {getListings} from '../../actions/listing'

const Listings = ({getListings, listing: {listings, loading}}) => {
	useEffect(() => {
		getListings()
	}, [getListings])


	return (
		<Fragment>
			<div class ='container text-left listings'>
				{listings.map(listing => (
					<div key={listing._id} class='row listing'>
						<h6 class = 'col-2'>
							{listing.created_at}
						</h6>
						<h6 class = 'col-2'>
							{listing.name}
						</h6>
						<h6 class = 'col-2 price'>
							{listing.price} 
							{' '}
							{listing.currency}
						</h6>
						<h6 class = 'col-6'>
							{listing.whisper}
						</h6>
						{'\n'}
					</div>
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