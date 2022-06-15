// import { baseURL } from './environment';

import environments from '../environment';
import axios from 'axios';

// get business Date
export const getBusinessDate = () => {
	let url = `${environments.dataURL}/lmsapi/commonServices/getBusinessDateInDate`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};