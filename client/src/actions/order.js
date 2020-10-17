import {ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, SHIPPING_ADDRESS_CREATE_SUCCESS, SHIPPING_ADDRESS_CREATE_FAIL, ORDER_ITEM_CREATE_SUCCESS, ORDER_ITEM_CREATE_FAIL} from './types';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

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
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: SHIPPING_ADDRESS_CREATE_FAIL,
			payload: err
		});
	}
};

export const placeAnOrder = (userid, orderItemId, shippingAddressId, paymentMethod, paymentResult, taxPrice, shippingPrice, totalPrice, isPaid) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({orderItemId, shippingAddressId, paymentMethod, paymentResult, taxPrice, shippingPrice, totalPrice, isPaid});

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

export const initTransNum = () => {
	const theOneNum = uuidv4();

	return theOneNum;
};
