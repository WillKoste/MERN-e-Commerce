import {SHIPPING_ADDRESS_CREATE_FAIL, SHIPPING_ADDRESS_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS} from '../actions/types';

const initialState = {
	transNum: null,
	addressId: null,
	loading: true
};

export default function (state = initialState, action) {
	const {payload, type} = action;

	switch (type) {
		case ORDER_ITEM_CREATE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case ORDER_ITEM_CREATE_FAIL:
			return {
				...state,
				loading: false
			};
		case SHIPPING_ADDRESS_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				addressId: payload.id
			};
		case SHIPPING_ADDRESS_CREATE_FAIL:
			return {
				...state,
				loading: false
			};
		case ORDER_CREATE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case ORDER_CREATE_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}
