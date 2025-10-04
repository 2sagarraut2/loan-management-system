import axios from 'axios';

export const CheckUser = (requestParams) => {

	let url = `http://qa.4fin.in/creditapi/validateUser`;

	return axios.post(url, requestParams, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});
};
