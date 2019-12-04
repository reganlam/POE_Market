import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// from file
import {getListings} from '../../actions/listing'
import Timer from './Timer'

const Listings = ({getListings, listing: {listings, loading}}) => {
	useEffect(() => {
		getListings()
	}, [getListings])

	document.title = `(${listings.length}) Path of Exile`
 
	return (
		<Fragment>
			<div className ='container text-left listings'>
				{listings.map(listing => (
					<Fragment key={listing._id}>
						{ listing.hasSeen === true ? (' ') :
						<Fragment>
							<div className ='row'>
								<h6><Timer date={listing.created_at}/></h6>
							</div>
							<div key={listing._id} className='row listing'>
								<h6 className = 'col-2'>
									{listing.name}
								</h6>
								<h6 className = 'col-2 price'>
									{listing.price} 
									{' '}
									{listing.currency}
								</h6>
								<h6 className = 'col-8'>
									{listing.whisper}
								</h6>
							</div>
						</Fragment>
						}
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