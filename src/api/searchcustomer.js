import { baseURL } from './environment';
import axios from 'axios';

export const searchCustomer = (params) => {
	let { type, value } = params;

	let url = `${baseURL}/lmsapi/customer/getCustomerList?type=${type}&value=${value}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};
