import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../../component/Loader';
import RunEOD from '../../component/EOD/RunEOD';
import { startEOD, getBusinessDate } from '../../api';
import '../../styles/basicdetails.scss';

const EOD = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	// form hooks
	const [businessDate, setBusinessDate] = useState('');

	// run EOD call
	const WakeEOD = () => {
		setLoading(true);

		startEOD()
			.then((res) => {
				if (res.status === 200) {
					setSuccessMsg('EOD run Successful');
                    getDate();
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
				setLoading(false);
			});
	};

	// get business date call
	const getDate = () => {
		getBusinessDate()
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setBusinessDate(data);
				}
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
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
				<RunEOD EOD={WakeEOD} getDate={getDate} businessDate={businessDate} />
			</div>
		</div>
	);
};

export default EOD;
