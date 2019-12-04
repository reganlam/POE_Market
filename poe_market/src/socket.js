import io from 'socket.io-client';
import {getListings} from './actions/listing'

const socket = io('http://localhost:8000');

const configureSocket = dispatch => {
	socket.on('connect', () => {
		console.log('Socket IO connected...');
	}); 

	socket.on('UPDATED_LISTINGS', () => {
		console.log('UPDATED_LISTINGS')
		dispatch(getListings())
	});

	return socket;
};

export default configureSocket;