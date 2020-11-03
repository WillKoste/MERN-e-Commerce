import {SHIPPING_ADDRESS_CREATE_FAIL, SHIPPING_ADDRESS_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, RESET_ORDER_SUCCESS, ORDER_INFO_SUCCESS, ORDER_INFO_FAIL, ORDER_ITEMS_FETCH_SUCCESS, ORDER_ITEMS_FETCH_FAIL, LOGOUT_SUCCESS} from '../actions/types';

const initialState = {
	addressId: null,
	loading: true,
	orderItem: {},
	otherInfo: {},
	orderItems: []
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
		case ORDER_ITEMS_FETCH_SUCCESS:
			return {
				...state,
				orderItems: payload.orderItems
			};
		case ORDER_ITEMS_FETCH_FAIL:
			return {
				...state,
				orderItems: []
			};
		case RESET_ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				success: null
			};
		case LOGOUT_SUCCESS:
			return {
				loading: false,
				addressId: null,
				orderItem: {},
				otherInfo: {},
				orderItems: []
			};
		default:
			return state;
	}
}
