import {GET_PRODUCT_LIST, PRODUCT_LIST_ERROR} from '../actions/types';

const initialState = {
	products: [],
	loading: true,
	error: null
};

export default function (state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case GET_PRODUCT_LIST:
			return {
				...state,
				loading: false,
				products: payload
			};
		case PRODUCT_LIST_ERROR:
			return {
				...state,
				loading: false,
				products: [],
				error: payload
			};
		default:
			return state;
	}
}
