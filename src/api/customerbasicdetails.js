import { baseURL } from './environment';
import axios from 'axios';

export const customerBasicDetails = (userId) => {
	let url = `${baseURL}/lmsapi/customer/getCustomer?customerId=${userId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

export const customerContactDetails = (userId) => {
	let url = `${baseURL}/lmsapi/customer/getCustomerContactInfo?customerId=${userId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

export const customerAddressTypeList = (userId) => {
	let url = `${baseURL}/lms/customer/getCustomerAddressTypeList?customerId=${userId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

export const customerAddress = (userId, addrType) => {
	console.log(userId, addrType);
	let url = `${baseURL}/lmsapi/customer/getCustomerAddress?customerId=${userId}&addrType=${addrType}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

export const customerAddressDetails = (userId, addressType) => {
	let url = `${baseURL}/lmsapi/customer/getCustomerAddress?customerId=${userId}&addrType=${addressType}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};

export const customerAgreementList = (userId) => {
	let url = `${baseURL}/lmsapi/agreement/getCustomerAgreementList?customerId=${userId}`;

	return axios.get(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
};
