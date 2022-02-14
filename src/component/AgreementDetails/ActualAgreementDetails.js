import React, { useState, useEffect } from 'react';
import { Grid, Snackbar, FormControl, Select } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementLoanList, agreementLoanInfo } from '../../api';

const ActualAgreementDetails = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { agreementId } = useParams();

	// form hooks
	const [loanIds, setLoanIds] = useState([]);
	const [selectedLoanId, setSelectedLoanId] = useState('');
	const [loanAmount, setLoanAmount] = useState('');
	const [interestType, setInterestType] = useState('');
	const [indexRate, setIndexRate] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [spreadRate, setSpreadRate] = useState('');
	const [offsetRate, setOffsetRate] = useState('');
	const [disbDate, offsetDate] = useState('');
	const [tenorStart, setTenorStart] = useState('');
	const [tenorEnd, setTenorEnd] = useState('');
	const [unbilledPrinciple, setUnbilledPrinciple] = useState('');
	const [totalBalTenor, setTotalBalTenor] = useState('');

	useEffect(() => {
		setLoading(true);
		agreementLoanList(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setLoanIds(data);
					setSelectedLoanId(data[0].loanId);
					getAgreementLoanInfo(agreementId, data[0].loanId);
				}
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
	}, [selectedLoanId]);

	const getAgreementLoanInfo = (agreementId, loanId) => {
		setLoading(true);
		agreementLoanInfo(agreementId, loanId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setLoanAmount(data.loanAmount)
					setInterestType(data.interestType)
					setIndexRate(data.indexRate)
					setInterestRate(data.interestRate)
					setSpreadRate(data.spreadRate)
					setOffsetRate(data.offsetRate);
					offsetDate(data.dtDisbursement)
					setTenorStart(data.dtTenorStartDate)
					setTenorEnd(data.dtTenorEndDate)
					setUnbilledPrinciple(data.unbilledPrincipal)
					setTotalBalTenor(data.balanceTenor)
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

	const handleOnSelectChange = (e) => {
		setSelectedLoanId(e.target.value);
		getAgreementLoanInfo(agreementId, selectedLoanId);
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
			<Grid container style={{ padding: '1% 20px' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Loan ID</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%', alignItems: 'end' }}>
						<FormControl style={{ margin: 7 }}>
							<Select
								native
								value={selectedLoanId}
								onChange={handleOnSelectChange}>
								{loanIds.map((item) => (
									<option key={item.loanId} value={item.loanId}>
										{item.loanId}
									</option>
								))}
							</Select>
						</FormControl>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Loan Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{loanAmount}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Interest Type</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{interestType}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Index Rate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{indexRate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Interest Rate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{interestRate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Spread Rate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{spreadRate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					{/* <h4></h4> */}
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Offset Rate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{offsetRate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Disb. Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{disbDate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					{/* <h4></h4> */}
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Tenor Start Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{tenorStart}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Tenor End Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{tenorEnd}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Unbilled Principle</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{unbilledPrinciple}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Total Balance Tenor</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{totalBalTenor}</h4>
				</Grid>
			</Grid>
		</div>
	);
};

export default ActualAgreementDetails;
