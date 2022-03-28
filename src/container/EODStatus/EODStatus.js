import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../../component/Loader';
import EndOfDay from '../../component/EndOfDay';
import { eodStatus } from '../../api';
import '../../styles/basicdetails.scss';

const EODStatus = () => {
	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const getEndOfDayStatus = (params) => {
		setLoading(true);
		eodStatus(params)
			.then((res) => {
				if (res.status === 200) {
					setData(res.data.eodStatus);
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
				<EndOfDay
					data={data}
					total={total}
					setTotal={setTotal}
					setData={setData}
					getEndOfDayStatus={getEndOfDayStatus}
				/>
			</div>
		</div>
	);
};

export default EODStatus;
