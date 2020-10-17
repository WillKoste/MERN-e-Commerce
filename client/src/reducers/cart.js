import {CLEAR_CART, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ERROR, SAVE_SHIPPING_INFO, SAVE_PAYMENT_INFO, LOGOUT_SUCCESS} from '../actions/types';

const initialState = {
	cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
	shippingAddress: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
	paymentMethod: localStorage.getItem('paymentInfo') ? JSON.parse(localStorage.getItem('paymentInfo')) : ''
};

export default function (state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case CART_ADD_ITEM:
			const item = payload;

			const exists = state.cartItems.find((x) => x.product === item.product);

			if (exists) {
				return {
					...state,
					cartItems: state.cartItems.map((thing) => (thing.product === exists.product ? item : thing))
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item]
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item.product !== payload)
			};
		case SAVE_SHIPPING_INFO:
			return {
				...state,
				shippingAddress: payload
			};
		case SAVE_PAYMENT_INFO:
			return {
				...state,
				paymentMethod: payload
			};
		case CART_ERROR:
			return {
				...state,
				error: payload
			};
		case CLEAR_CART:
			localStorage.removeItem('cartItems');
			return {
				...state,
				cartItems: []
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				cartItems: [],
				shippingAddress: {},
				paymentMethod: ''
			};
		default:
			return state;
	}
}
