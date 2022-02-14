import { baseURL } from './environment';
import axios from 'axios';

// get future dues
export const futureDues = (fromDate, toDate) => {
	let url = `${baseURL}/lmsapi/instrument/getFutureDues?fromDate=2020-01-01&toDate=2021-03-01`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};