import {LOGOUT_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_ERROR, USER_LOADED, REGISTER_SUCCESS, REGISTER_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

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

export const register = (email, password, name, isadmin = false) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({email, password, name, isadmin});

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

export const logout = () => async (dispatch) => {
	dispatch({type: LOGOUT_SUCCESS});
};

export const updateProfile = (user) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const res = await axios.put(`/api/users/${user.id}`, user, config);

	try {
		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: err
		});
	}
};
