import {GET_PRODUCT_LIST, PRODUCT_LIST_ERROR} from './types';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
	try {
		const res = await axios.get(`/api/product`);

		dispatch({
			type: GET_PRODUCT_LIST,
			payload: res.data.products
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_LIST_ERROR,
			payload: err
		});
	}
};
