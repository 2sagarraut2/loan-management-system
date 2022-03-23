// import { baseURL } from './environment';
import environments from '../environment';

import axios from 'axios';

export const cashReceipt = (params) => {
	let url = `${environments.dataURL}/lmsapi/request/dreReqCash`;

	return axios.post(url, params, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});
};

export const chequeReceipt = (params) => {
	let url = `${environments.dataURL}/lmsapi/request/dreReqCheque`;

	return axios.post(url, params, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});
};
