import {SHIPPING_ADDRESS_CREATE_FAIL, SHIPPING_ADDRESS_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, RESET_ORDER_SUCCESS, ORDER_INFO_SUCCESS, ORDER_INFO_FAIL} from '../actions/types';

const initialState = {
	transNum: null,
	addressId: null,
	loading: true,
	orderItem: {},
	orderInfo: {}
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
				loading: false,
				success: true
			};
		case ORDER_CREATE_FAIL:
			return {
				...state,
				loading: false,
				success: false
			};
		case ORDER_INFO_SUCCESS:
			return {
				...state,
				loading: false,
				orderItem: payload.order,
				otherInfo: payload.otherInfo
			};
		case ORDER_INFO_FAIL:
			return {
				...state,
				loading: false,
				orderItem: {}
			};
		case RESET_ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				success: null
			};
		default:
			return state;
	}
}
