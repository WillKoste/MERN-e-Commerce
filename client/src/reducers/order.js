import {SHIPPING_ADDRESS_CREATE_FAIL, SHIPPING_ADDRESS_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
	const {payload, type} = action;

	switch (type) {
		default:
			return state;
	}
}
