// import { baseURL } from './environment';

import environments from '../environment';
import axios from 'axios';

// get limit history header
export const limitHistory = (agreementId) => {
	let url = `${environments.dataURL}/lmsapi/agreement/getAgreementTranHistoryOdHeader?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// get limit history table data
export const limitHistoryTableData = (params) => {
	const { agreementId, fromDate, toDate, pageNo, pageSize } = params;
	let url = `${environments.dataURL}/lmsapi/agreement/getAgreementTranHistoryOdList?masterAgreement=${agreementId}&fromDate=${fromDate}&toDate=${toDate}&pageNo=${pageNo}&pageSize=${pageSize}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};
