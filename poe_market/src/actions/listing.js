import axios from 'axios'
import {
	GET_LISTINGS,
	MAKE_LISTING_SEEN,
	LISTING_ERROR
} from './types'

// Get all listings
export const getListings = () => async dispatch => {
	console.log('getListings: dispatching...')
	try {
		const res = await axios.get('/api/listings')

		dispatch({
			type: GET_LISTINGS,
			payload: res.data
		})
	} catch(err){
		// TODO: error dispatch
		dispatch({
			type: LISTING_ERROR
		})
	}
}

export const makeListingSeen = (id) => async dispatch => {
	console.log('makeListingSeen: dispatching...')
	try {
		await axios.put(`/api/listings/${id}`)

		dispatch({
			type: MAKE_LISTING_SEEN
		})

		dispatch(getListings())
	} catch(err){
		// TODO: error dispatch
		dispatch({
			type: LISTING_ERROR
		})
	}
}