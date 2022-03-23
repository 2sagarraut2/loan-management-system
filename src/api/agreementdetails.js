// import { baseURL } from './environment';
import environments from '../environment';

import axios from 'axios';

// agreement overview
export const agreementInfo = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementInfo?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// agreement details
export const agreementLoanInfo = (agreementId, loanId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementLoanInfo?mastAgrId=${agreementId}&loanId=${loanId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// product parameters
export const productParameters = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementProductInfo?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// fee
export const feeList = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementFeeList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// current due details
export const agreementDueList = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementDueList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
}

// limit details
export const agreementLimitList = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementLimitList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
}

// repayment schedule loanID dropdown
export const agreementLoanList = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementLoanList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// repayment schedule table
export const agreementAmortList = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementAmortList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// transaction history header
export const agreementTransHeader = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementTranHistoryHeader?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// transaction history
export const agreementTransList = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementTranHistoryList?masterAgreement=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

//interst accural history
export const interstAccuralHistory = (agreementId, loanID, fromDate, toDate) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getAgreementIntAccrualList?masterAgreement=${agreementId}&loanId=${loanID}&fromDate=${fromDate}&toDate=${toDate}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// epay
export const ePayAgreementDetails = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getEpayAgreementDetails?mastAgrId=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// collateral details
export const collateralDetails = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/agreement/getCollateralDetails?mastAgrId=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

// list of co-applicant / customers
export const customerList = (agreementId) => {
    let url = `${environments.dataURL}/lmsapi/customer/getCustomerList?type=master_agreement_id&value=${agreementId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};