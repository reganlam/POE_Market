import {
	GET_LISTINGS, 
	LISTING_ERROR,
	MAKE_LISTING_SEEN
} from '../actions/types'

const initialState = {
	listings: [],
	loading: true,
	error: {}
}

export default function(state=initialState, action) {
	const {type, payload} = action

	switch(type){
		case GET_LISTINGS:
			return {
				...state,
				listings: payload.filter(listing => listing.hasSeen === false).reverse(),
				// listings: payload.reverse(),
				loading: false
			}
		case MAKE_LISTING_SEEN:
		case LISTING_ERROR:
		default:
			return state
	}
}