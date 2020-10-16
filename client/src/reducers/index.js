import {combineReducers} from 'redux';
import productRed from './products';
import singleProductRed from './singleProduct';
import cart from './cart';
import user from './user';
import order from './order';

export default combineReducers({
	productRed,
	singleProductRed,
	cart,
	user,
	order
});
