import React, { useState } from 'react';
import CustomerSearch from '../../component/Customer/CustomerSearch';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../../component/Loader';
import '../../styles/customer.scss';
import { searchCustomer } from '../../api';

const Customer = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const searchForCustomer = (params) => {
		setLoading(true);
		searchCustomer(params)
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
				}
				setLoading(false);
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
				setData([]);
				setLoading(false);
			});
	};

	return (
		<div>
			<Snackbar
				open={Boolean(successMsg)}
				autoHideDuration={3000}
				onClose={() => setSuccessMsg('')}>
				<Alert
					elevation={6}
					variant='filled'
					onClose={() => {
						setSuccessMsg('');
					}}
					severity='success'>
					{successMsg}
				</Alert>
			</Snackbar>
			<Snackbar
				open={Boolean(errorMsg)}
				autoHideDuration={3000}
				onClose={() => setErrorMsg('')}>
				<Alert
					elevation={6}
					variant='filled'
					onClose={() => {
						setErrorMsg('');
					}}
					severity='error'>
					{errorMsg}
				</Alert>
			</Snackbar>
			{loading && <Loader />}
			<div>
				<CustomerSearch
					data={data}
					searchForCustomer={searchForCustomer}
					setData={setData}
				/>
			</div>
		</div>
	);
};

export default Customer;
