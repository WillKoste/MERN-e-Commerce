import {SHIPPING_ADDRESS_CREATE_FAIL, SHIPPING_ADDRESS_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS} from '../actions/types';

const initialState = {
	transNum: null,
	addressId: null
};

export default function (state = initialState, action) {
	const {payload, type} = action;

	switch (type) {
		case ORDER_ITEM_CREATE_SUCCESS:
			return {
				...state
			};
		case ORDER_ITEM_CREATE_FAIL:
			return {
				...state
			};
		case SHIPPING_ADDRESS_CREATE_SUCCESS:
			return {
				...state,
				addressId: payload.id
			};
		case SHIPPING_ADDRESS_CREATE_FAIL:
			return {
				...state
			};
		case ORDER_CREATE_SUCCESS:
			return {
				...state
			};
		case ORDER_CREATE_FAIL:
			return {
				...state
			};
		default:
			return state;
	}
}
