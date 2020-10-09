import {combineReducers} from 'redux';
import productRed from './products';
import singleProductRed from './singleProduct';
import cart from './cart';

export default combineReducers({
	productRed,
	singleProductRed,
	cart
});
