// import { baseURL } from './environment';

import environments from '../environment';
import axios from 'axios';

export const CheckUser = (requestParams) => {
	let url = `${environments.dataURL}/creditapi/validateUser`;

	return axios.post(url, requestParams, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});
};
