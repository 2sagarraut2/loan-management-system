// import { baseURL } from './environment';

import environments from '../environment';
import axios from 'axios';

// get future dues
export const futureDues = (fromDate, toDate) => {
	let url = `${environments.dataURL}/lmsapi/instrument/getFutureDues?fromDate=${fromDate}&toDate=${toDate}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};