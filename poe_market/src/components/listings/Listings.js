import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// from file
import {getListings, makeListingSeen} from '../../actions/listing'
import Timer from './Timer'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Listings = ({getListings, makeListingSeen, listing: {listings, loading}}) => {
	useEffect(() => {
		getListings()
	}, [getListings])

	document.title = `(${listings.length}) - Path of Exile`
 
	return (
		<Fragment>
			<div className ='container text-left listings'>
				{listings.map(listing => (
					<Fragment key={listing._id}>
						<div className ='row'>
							<h6><Timer date={listing.created_at}/></h6>
						</div>
						<div key={listing._id} className='row listing'>
							<h6 className = 'col-2'>
								<button type="button" onClick={ () => {
									window.confirm('Are you sure you wish to hide this listing?') && makeListingSeen(listing._id)
								}} className="btn btn-dark">{listing.name}</button>
							</h6>
							<h6 className = 'col-2'>
								<div className="btn btn-dark">{listing.price}{' '}{listing.currency}</div>
							</h6>
							<h6 className = 'col-8'>
								<CopyToClipboard text={listing.whisper}>
        							<button className="btn btn-dark">{listing.whisper}</button>
      							</CopyToClipboard>
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
	makeListingSeen: PropTypes.func.isRequired,
	listing: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	listing: state.listing
})

export default connect(mapStateToProps, {getListings, makeListingSeen})(Listings)