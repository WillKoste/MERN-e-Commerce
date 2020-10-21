import {ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, SHIPPING_ADDRESS_CREATE_SUCCESS, SHIPPING_ADDRESS_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL, RESET_ORDER_SUCCESS} from './types';
import axios from 'axios';

export const createOrderItem = (name, qty, image, price, product_id, transaction_number) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({name, qty, image, price, product_id, transaction_number});

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
export const createShippingAddress = (address, city, postal_code, country, user_id) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({address, city, postal_code, country, user_id});

	try {
		const res = await axios.post(`/api/orders/address`, body, config);
		dispatch({
			type: SHIPPING_ADDRESS_CREATE_SUCCESS,
			payload: res.data.shippingAddress
		});
	} catch (err) {
		dispatch({
			type: SHIPPING_ADDRESS_CREATE_FAIL,
			payload: err
		});
	}
};

export const placeAnOrder = (transaction_number, shipping_address_id, payment_method, items_price, tax_price, shipping_price, total_price) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({transaction_number, shipping_address_id, payment_method, items_price, tax_price, shipping_price, total_price});

	try {
		const res = await axios.post(`/api/orders/place`, body, config);

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

export const resetSuccess = () => async (dispatch) => {
	dispatch({
		type: RESET_ORDER_SUCCESS
	});
};

export const getOrderInfo = (transNum) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/orders/${transNum}`);
	} catch (err) {
		console.error(err);
	}
};
