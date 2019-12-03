import axios from 'axios'
import {
	GET_LISTINGS
} from './types'

// Get all listings
export const getPosts = () => async dispatch => {
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