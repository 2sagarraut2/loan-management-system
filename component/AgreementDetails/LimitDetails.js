import React, { useState, useEffect } from 'react';
// import { Table } from 'antd';
import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementLimitList } from '../../api';
import { numberWithCommas } from '../../utils';

const LimitDetails = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { agreementId } = useParams();

	// form hooks
	const [drawingPower, setDrawingPower] = useState(0);
	const [dtLimitExpired, setDtLimitExpired] = useState('');
	const [dtLimitSanctioned, setDtLimitSanctioned] = useState('');
	const [limitSanctionAmount, setLimitSanctionAmount] = useState(0);
	const [loanId, setLoanId] = useState('');
	const [masterAgreement, setMasterAgreement] = useState('');
	const [purpose, setPurpose] = useState('');
	// const [slimitId, setSlimitId] = useState('');
	const [utilizedLimit, setUtilizedLimit] = useState('');

	useEffect(() => {
		setLoading(true);
		agreementLimitList(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setDrawingPower(data.drawingPower);
					setDtLimitExpired(data.dtLimitExpired);
					setDtLimitSanctioned(data.dtLimitSanctioned);
					setLimitSanctionAmount(data.limitSanctionAmount);
					setLoanId(data.loanId);
					setMasterAgreement(data.masterAgreement);
					setPurpose(data.purpose);
					// setSlimitId(data.slimitId);
					setUtilizedLimit(data.utilizedLimit);
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

		// eslint-disable-next-line
	}, [agreementId]);

	return (
		<div style={{ padding: '1% 20px' }}>
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
			<Grid container style={{ padding: '1% 20px' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Drawing Power</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{drawingPower}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Limit Expiry Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dtLimitExpired}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Limit Sanctioned Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dtLimitSanctioned}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Limit Sanctioned Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>
						{numberWithCommas(limitSanctionAmount)}
					</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Loan ID</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{loanId}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Master Agreement ID</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{masterAgreement}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Purpose</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{purpose}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Utilized Limit</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(utilizedLimit)}</h4>
				</Grid>
			</Grid>
		</div>
	);
};

export default LimitDetails;
