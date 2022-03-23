// import { baseURL } from './environment';
import environments from '../environment';

import axios from 'axios';

// search batch page
export const searchBatchDetails = ({
	instrumentType,
	batchStatus,
	toDateParam,
	fromDateParam
}) => {
	let url = `${environments.dataURL}/lmsapi/instrument/getBatchList?instrumentType=${instrumentType}&batchStatus=${batchStatus}&fromDate=${fromDateParam}&toDate=${toDateParam}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// show batch details
export const batchDetails = (batchId) => {
	let url = `${environments.dataURL}/lmsapi/instrument/getBatchDetailsList?batchId=${batchId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// Download Batch
export const downloadBatch = (params) => {
	const { arrBatchId, businessDate } = params;
	let url = `${environments.dataURL}/lmsapi/instrument/batchDownloadInBulk?arrBatchId=${arrBatchId}&businessDate=${businessDate}`;

	return axios.get(url, {
		method: 'GET',
		responseType: 'arraybuffer',
		headers: { 'Content-Type': 'application/json' }
	});
};

// upload batch
export const uploadBatch = (params) => {
	const { batchId, fileData, fileName, businessDate } = params;
	let url = `${environments.dataURL}/lmsapi/instrument/batchUploadCsv?batchId=${batchId}&fileName=${fileName}&businessDate=${businessDate}`;

	return axios.post(url, fileData, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	});
};
