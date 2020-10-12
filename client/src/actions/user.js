import {LOGOUT_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_ERROR, USER_LOADED, REGISTER_SUCCESS, REGISTER_FAIL} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// export const loadUser = () => async (dispatch) => {
// 	if (localStorage.userInfo) {
// 		setAuthToken(localStorage.userInfo);
// 		console.error(localStorage.userInfo, 123456);
// 	}

// 	try {
// 		const res = await axios.get('/api/users/me');

// 		console.error(res, 'hey hgey');

// 		dispatch({
// 			type: USER_LOADED,
// 			payload: res.data
// 		});
// 	} catch (err) {
// 		dispatch({
// 			type: LOGIN_ERROR,
// 			payload: err.response && err.response.data.msg ? err.response.data.message : err.message
// 		});
// 	}
// };

// export const login = (email, password) => async (dispatch) => {
// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	};

// 	const body = JSON.stringify({email, password});

// 	try {
// 		const res = await axios.post('/api/users/login', body, config);

// 		console.log(res.data);

// 		localStorage.setItem('userInfo', JSON.stringify(res.data));

// 		dispatch({
// 			type: LOGIN_SUCCESS,
// 			payload: res.data
// 		});
// 		dispatch(loadUser());
// 	} catch (err) {
// 		console.error(err);

// 		dispatch({
// 			type: LOGIN_ERROR,
// 			payload: err
// 		});
// 	}
// };

// export const register = () => async (dispatch) => {
// 	alert('registered');
// };

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`/api/users/me`);

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: LOGIN_ERROR
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({email, password});

	try {
		const res = await axios.post(`/api/users/login`, body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		console.error(err);

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

export const register = (email, password, name) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({email, password, name});

	try {
		const res = await axios.post(`/api/users/register`, body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		console.error(err);

		dispatch({
			type: REGISTER_FAIL
		});
	}
};
