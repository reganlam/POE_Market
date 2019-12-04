import {GET_LISTINGS} from '../actions/types'

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
				listings: payload.reverse(),
				loading: false
			}
		default:
			return state
	}
}