import React, { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../../component/Loader';
import '../../styles/customer.scss';
import { viewAllCustomers } from '../../api';
import AllCustomers from '../../component/AllCustomers/AllCustomers';

const ViewCustomers = () => {
	const [data, setData] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		setLoading(true);

		const params = {
			pageNo: pageNo - 1,
			pageSize: 10
		}

		viewAllCustomers(params)
			.then((res) => {
				if (res.status === 200) {
					setData(res.data.allAgreementDto);
					setTotal(res.data.totalRows);
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
	}, [pageNo]);

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
				<AllCustomers
					viewAllCustomers={viewAllCustomers}
					data={data}
					pageNo={pageNo}
					setPageNo={setPageNo}
					total={total}
					setTotal={setTotal}
				/>
			</div>
		</div>
	);
};

export default ViewCustomers;
