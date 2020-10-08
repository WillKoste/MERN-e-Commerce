import {SINGLE_PRODUCT_SUCCESS, SINGLE_PRODUCT_FAIL} from './types';
import axios from 'axios';

export const getSingleProduct = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/product/${id}`);

		dispatch({
			type: SINGLE_PRODUCT_SUCCESS,
			payload: res.data.product
		});
	} catch (err) {
		dispatch({
			type: SINGLE_PRODUCT_FAIL,
			payload: err.response && err.response.data.msg ? err.response.data.message : err.message
		});
	}
};
