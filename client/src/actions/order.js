import {ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, SHIPPING_ADDRESS_CREATE_SUCCESS, SHIPPING_ADDRESS_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL} from './types';
import axios from 'axios';

export const createOrderItem = (name, qty, image, price, productId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({name, qty, image, price, productId});

	try {
		const res = await axios.post(`/api/orders/items`, body, config);

		dispatch({
			type: ORDER_ITEM_CREATE_SUCCESS,
			dispatch: res.data
		});
	} catch (err) {
		dispatch({
			type: ORDER_ITEM_CREATE_FAIL,
			payload: err
		});
	}
};
export const createShippingAddress = (address, city, postal_code, country, userId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({address, city, postal_code, country, userId});

	try {
		const res = await axios.post(`/api/orders/address`, body, config);

		dispatch({
			type: SHIPPING_ADDRESS_CREATE_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: SHIPPING_ADDRESS_CREATE_FAIL,
			payload: err
		});
	}
};

export const placeAnOrder = (placeholder, userid) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify(placeholder);

	try {
		const res = await axios.post(`/api/orders/${userid}`);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		console.error(err);
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: err
		});
	}
};
