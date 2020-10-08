import {combineReducers} from 'redux';
import productRed from './products';
import singleProductRed from './singleProduct';

export default combineReducers({
	productRed,
	singleProductRed
});
