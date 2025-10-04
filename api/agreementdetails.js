import { baseURL } from './environment';
import axios from 'axios';

// agreement overview
export const agreementInfo = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementInfo?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// agreement details
export const agreementLoanInfo = (agreementId, loanId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementLoanInfo?mastAgrId=${agreementId}&loanId=${loanId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// product parameters
export const productParameters = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementProductInfo?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// fee
export const feeList = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementFeeList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// current due details
export const agreementDueList = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementDueList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
}

// limit details
export const agreementLimitList = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementLimitList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
}

// repayment schedule loanID dropdown
export const agreementLoanList = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementLoanList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// repayment schedule table
export const agreementAmortList = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementAmortList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// transaction history header
export const agreementTransHeader = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementTranHistoryHeader?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// transaction history
export const agreementTransList = (agreementId) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementTranHistoryList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

//interst accural history
export const interstAccuralHistory = (agreementId, loanID, fromDate, toDate) => {
    let url = `${baseURL}/lmsapi/agreement/getAgreementIntAccrualList?masterAgreement=${agreementId}&loanId=${loanID}&fromDate=${fromDate}&toDate=${toDate}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};