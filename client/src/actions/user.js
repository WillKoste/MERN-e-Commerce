import {LOGOUT_SUCCESS, LOGIN_SUCCESS, LOGIN_ERROR} from './types';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({email, password});

	try {
		const res = await axios.post('/api/users/login', body, config);
	} catch (err) {
		dispatch({
			type: LOGIN_ERROR,
			payload: err.response && err.response.data.msg ? err.response.data.message : err.message
		});
	}
};
