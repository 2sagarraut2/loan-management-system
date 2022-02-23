import { baseURL } from './environment';
import axios from 'axios';

// get business Date
export const getBusinessDate = () => {
	let url = `${baseURL}/lmsapi/commonServices/getBusinessDateInDate`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};