import { baseURL } from './environment';
import axios from 'axios';

// search batch page
export const searchBatchDetails = ({
	instrumentType,
	batchStatus,
	toDateParam,
	fromDateParam
}) => {
	let url = `${baseURL}/lmsapi/instrument/getBatchList?instrumentType=${instrumentType}&batchStatus=${batchStatus}&fromDate=${fromDateParam}&toDate=${toDateParam}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// agreement overview
export const batchDetails = (batchId) => {
	let url = `${baseURL}/lmsapi/instrument/getBatchDetailsList?batchId=${batchId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};
