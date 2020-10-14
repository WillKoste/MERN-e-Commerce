import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ERROR, SAVE_SHIPPING_INFO, SAVE_PAYMENT_INFO} from './types';
import axios from 'axios';

export const addCart = (id, qty) => async (dispatch, getState) => {
	try {
		const res = await axios.get(`/api/product/${id}`);

		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: res.data.product.id,
				name: res.data.product.name,
				image: res.data.product.image,
				price: res.data.product.price,
				countinstock: res.data.product.countinstock,
				qty
			}
		});

		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
	} catch (err) {
		console.log(err);
		dispatch({
			type: CART_ERROR,
			payload: err.response && err.response.data.msg ? err.response.data.message : err.message
		});
	}
};

export const removeCart = (id) => async (dispatch, getState) => {
	try {
		const res = await axios.get(`/api/product/${id}`);
		// console.log(res.data.product.id);

		let allItems = JSON.parse(localStorage.getItem('cartItems'));
		const theIndex = allItems.findIndex((el) => el.product === id);

		allItems.splice(theIndex, 1);

		localStorage.removeItem('cartItems');
		localStorage.setItem('cartItems', JSON.stringify(allItems));

		dispatch({
			type: CART_REMOVE_ITEM,
			payload: res.data.product.id
		});
	} catch (err) {
		dispatch({
			type: CART_ERROR,
			payload: err.response && err.response.data.msg ? err.response.data.message : err.message
		});
	}
};

export const saveShippingInfo = (info) => async (dispatch) => {
	dispatch({
		type: SAVE_SHIPPING_INFO,
		payload: info
	});

	localStorage.setItem('shippingInfo', JSON.stringify(info));
};

export const savePaymentInfo = (info) => async (dispatch) => {
	dispatch({
		type: SAVE_PAYMENT_INFO,
		payload: info
	});

	localStorage.setItem('paymentInfo', JSON.stringify(info));
};
