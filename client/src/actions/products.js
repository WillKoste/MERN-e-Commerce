import axios from 'axios';

export const getProducts = async () => {
	try {
		const res = await axios.get(`http://localhost:5004/api/product`);

		console.log(res.data);

		return res.data;
	} catch (err) {
		console.error(err);
	}
};
