import { baseURL } from './environment';
import axios from 'axios';

// get future dues
export const eodStatus = (params) => {
	const { fromDateParam, pageNo, pageSize } = params;

	let url = `${baseURL}/lmsapi/eod/getEodStatus?businessDate=${fromDateParam}&pageNo=${pageNo}&pageSize=${pageSize}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};
