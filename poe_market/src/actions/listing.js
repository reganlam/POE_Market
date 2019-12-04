import axios from 'axios'
import {
	GET_LISTINGS
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
	}
}