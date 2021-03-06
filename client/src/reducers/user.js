import {LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_ERROR, LOGOUT_SUCCESS, USER_LOADED, REGISTER_FAIL, REGISTER_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	error: null,
	userInfo: null,
	updateSuccess: null
};

export default function (state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				userInfo: payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOGIN_ERROR:
		case LOGOUT_SUCCESS:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				userInfo: null
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				userInfo: payload.user,
				loading: false,
				updateSuccess: true
			};
		case UPDATE_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
				updateSuccess: false
			};
		default:
			return state;
	}
}
