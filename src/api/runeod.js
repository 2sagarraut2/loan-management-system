// import { baseURL } from './environment';

import environments from '../environment';
import axios from 'axios';

// get future dues
export const startEOD = () => {

	let url = `${environments.dataURL}/lmsapi/eod/mainEodFrontEnd`;

	return axios.post(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});
};