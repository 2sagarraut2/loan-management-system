import React, { useState, useEffect } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { productParameters } from '../../api';

const ProductParameters = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { agreementId } = useParams();

	// form hooks
	const [productCode, setProductCode] = useState('');
	const [interestFrequency, setInterestFrequency] = useState('');
	const [emiBasis, setEmiBasis] = useState('');
	const [interestBasis, setInterestBasis] = useState('');
	const [interestType, setInterestType] = useState('');
	const [amortMethod, setAmortMethod] = useState('');
	const [amortType, setAmortType] = useState('');
	const [emiRounding, setEmiRounding] = useState('');
	const [penalIntRate, setPenalIntRate] = useState('');
	const [penalIntBasis, setPenalIntBasis] = useState('');
	const [penalAccBasis, setPenalAccBasis] = useState('');
	const [graceDays, setGraceDays] = useState('');
	const [reLockInPeriod, setReLockInPeriod] = useState('');
	const [allowPrepaymentDueData, setAllowPrepaymentDueData] = useState('');
	const [prepayAftInstNo, setPrepayAftInstNo] = useState('');
	const [prepayBfrInstNo, setPrepayBfrInstNo] = useState('');
	const [minPrepayAmount, setMinPrepayAmount] = useState('');
	const [instlGapBtnTwoPrepay, setInstlGapBtnTwoPrepay] = useState('');
	const [foreclosureAfterInstNo, setForeclosureAfterInstNo] = useState('');
	const [foreclosureBeforeInstNo, setForeclosureBeforeInstNo] = useState('');
	const [minTenor, setMinTenor] = useState('');
	const [maxTenor, setMaxTenor] = useState('');
	const [minInst, setMinInst] = useState('');
	const [maxInst, setMaxInst] = useState('');
	const [minInterestRate, setMinInterestRate] = useState('');
	const [maxInterestRate, setMaxInterestRate] = useState('');
	const [dropLineOD, setdropLineOD] = useState('');
	const [dropLinePercentage, setDropLinePercentage] = useState('');
	const [dropLineMode, setDropLineMode] = useState('');
	const [dropLineAmount, setDropLineAmount] = useState('');
	const [dropLineFreq, setDropLineFreq] = useState('');

	useEffect(() => {
		setLoading(true);
		productParameters(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setProductCode(data[0].prodCode);
					setInterestFrequency(data[0].interestAccrualFrequ);
					setEmiBasis(data[0].emiBasis);
					setInterestBasis(data[0].interestBasis);
					setInterestType(data[0].interestType);
					setAmortMethod(data[0].amortizationMethod);
					setAmortType(data[0].amortizationType);
					setEmiRounding(data[0].emiRounding);
					setPenalIntRate(data[0].penalInterestRate);
					setGraceDays(data[0].graceDays);
					setPenalIntBasis(data[0].penalInterestBasis);
					setPenalAccBasis(data[0].penalAccountingBasis);
					setReLockInPeriod(data[0].reschLockinPeriod);
					setAllowPrepaymentDueData(data[0].penalAccountingBasis); // needs to recheck
					setPrepayAftInstNo(data[0].prepayAfterInstNo);
					setPrepayBfrInstNo(data[0].prepayBeforeInstNo);
					setMinPrepayAmount(data[0].minPrepayAmount);
					setInstlGapBtnTwoPrepay(data[0].minInstallmentGapBetPrepay);
					setForeclosureAfterInstNo(data[0].forecloseAfterInstNo);
					setForeclosureBeforeInstNo(data[0].forecloseBeforeInstaNo);
					setMinTenor(data[0].minTenor);
					setMaxTenor(data[0].maxTenor);
					setMinInst(data[0].minInstallmentAmount);
					setMaxInst(data[0].maxInstallmentAmount);
					setMinInterestRate(data[0].minInterestRate);
					setMaxInterestRate(data[0].maxInterestRate);
					setdropLineOD(data[0].dropLineODYN);
					setDropLinePercentage(data[0].dropLinePerc);
					setDropLineMode(data[0].dropMode);
					setDropLineAmount(data[0].dropLineAmount);
					setDropLineFreq(data[0].dropLIneFreq);
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
					<h4>Product Code</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{productCode}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Interest Accural Frequency</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{interestFrequency}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>EMI Basis</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{emiBasis ? emiBasis : '-'}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Interest Basis</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{interestBasis}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Interest Type</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{interestType}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Amortization Method</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{amortMethod}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Amortization Type</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{amortType}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>EMI Rounding</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{emiRounding}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Penal Interest Rate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{penalIntRate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Penal Interest Basis</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{penalIntBasis}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Penal Accounting Basis</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{penalAccBasis}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Grace Days</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{graceDays}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Reschedule Lock In Period</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{reLockInPeriod}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Allow Prepayment on Due Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{allowPrepaymentDueData}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Prepay After Installment Number</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{prepayAftInstNo}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Prepay Before Installment Number</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{prepayBfrInstNo}</h4>
				</Grid>

				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Minimum Prepayment Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{minPrepayAmount}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Installment Gap Between Two 2 Prepayment</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{instlGapBtnTwoPrepay}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Foreclosure After Installment Number</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{foreclosureAfterInstNo}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Foreclosure Before Installment Number</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{foreclosureBeforeInstNo}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Minimum Tenor</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{minTenor}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Maximum Tenor</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{maxTenor}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Minimum Installment</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{minInst}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Maximum Installment</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{maxInst}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Minimum Interest Rate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{minInterestRate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Maximum Interest Rate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{maxInterestRate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Dropline OD</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dropLineOD}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Dropline Percentage</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dropLinePercentage}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Dropline Mode</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dropLineMode}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Dropline Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dropLineAmount}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Dropline Frequency</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dropLineFreq}</h4>
				</Grid>
			</Grid>
		</div>
	);
};

export default ProductParameters;
