import {LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS} from '../actions/types';

const initialState = {
	userInfo: {},
	loading: true,
	error: null
};

export default function (state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				loading: false,
				user: {}
			};
		case LOGIN_ERROR:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
