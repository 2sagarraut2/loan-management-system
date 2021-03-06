// import { baseURL } from './environment';
import environments from '../environment';

import axios from 'axios';

export const viewAllCustomers = (params) => {
	const { pageNo, pageSize } = params;

	let url = `${environments.dataURL}/lmsapi/agreement/getAllAgreementDetails?pageNo=${pageNo}&pageSize=${pageSize}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};
