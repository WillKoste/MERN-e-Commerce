import {SINGLE_PRODUCT_SUCCESS, SINGLE_PRODUCT_FAIL} from '../actions/types';

const initialState = {
	product: {
		reviews: []
	},
	loading: true,
	error: null
};

export default function (state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case SINGLE_PRODUCT_SUCCESS:
			return {
				...state,
				product: payload,
				loading: false
			};
		case SINGLE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
}
