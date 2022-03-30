import React, { useState, useEffect } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { ePayAgreementDetails } from '../../api';
import { numberWithCommas } from '../../utils';

const EPay = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { agreementId } = useParams();

	// form hooks
	const [accountNo, setAccountNo] = useState('');
	const [accountType, setAccountType] = useState('');
	const [active, setActive] = useState('');
	const [bankBranchCode, setBankBranchCode] = useState('');
	const [bankCode, setBankCode] = useState('');
	const [customerId, setCustomerId] = useState('');
	const [depositBank, setDepositBank] = useState('');
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [ePayId, setEPayId] = useState('');
	const [frequency, setFrequency] = useState('');
	const [iban, setIban] = useState('');
	const [ifscCode, setIFSCCode] = useState('');
	const [installmentAmount, setInstallmentAmount] = useState('');
	const [instrumentType, setInstrumentType] = useState('');
	const [mandateRefNo, setMandateRefNo] = useState('');
	const [mandateStatus, setMandateStatus] = useState('');
	const [mandateType, setMandateType] = useState('');
	const [maxCeilAmount, setMaxCeilAmount] = useState('');
	const [maxInstAmt, setMaxInstAmt] = useState('');
	const [utrNo, setUtrNo] = useState('');

	useEffect(() => {
		setLoading(true);
		ePayAgreementDetails(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setAccountNo(data[0].accountNo);
					setAccountType(data[0].accountType);
					setActive(data[0].active);
					setBankBranchCode(data[0].bankBranchCode);
					setBankCode(data[0].bankCode);
					setCustomerId(data[0].customerId);
					setDepositBank(data[0].depositBank);
					setFromDate(data[0].dtFromDate);
					setToDate(data[0].dtToDate);
					setEPayId(data[0].epayId);
					setFrequency(data[0].frequency);
					setIban(data[0].iban);
					setIFSCCode(data[0].ifscCode);
					setInstallmentAmount(data[0].installmentAmount);
					setInstrumentType(data[0].instrumentType);
					setMandateRefNo(data[0].mandateRefNo);
					setMandateStatus(data[0].mandateStatus);
					setMandateType(data[0].mandateType);
					setMaxCeilAmount(data[0].maxCeilAmount);
					setMaxInstAmt(data[0].maxInstallmentAmount);
					setUtrNo(data[0].utrNo);
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
			<div className="cate-main-wrapper">
				<div className='cate-title-wrapper'>
					<h3>Customer Details</h3>
				</div>
				<Grid container style={{ padding: '1% 20px' }}>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Account No</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{accountNo}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Account Type</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{accountType}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Active</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{active}</h4>
					</Grid>

					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Customer ID</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{customerId}</h4>
					</Grid>
				</Grid>
			</div>
			<div className="cate-main-wrapper">
				<div className='cate-title-wrapper'>
					<h3>ENACH Details</h3>
				</div>
				<Grid container style={{ padding: '1% 20px' }}>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Bank Code</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{bankCode}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Bank Branch Code</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{bankBranchCode}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Deposit Bank</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{depositBank}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>IFSC Code</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{ifscCode}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>From Date</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{fromDate}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>To Date</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{toDate}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Epay ID</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{ePayId}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Frequency</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{frequency}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>IBAN</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{iban}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Installment Amount</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>
							{numberWithCommas(installmentAmount)}
						</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Instrument Type</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{instrumentType}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Mandate Reference No.</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{mandateRefNo}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Mandate Status</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{mandateStatus}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Mandate Type</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{mandateType}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Max CEIL Amount</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>
							{numberWithCommas(maxCeilAmount)}
						</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>Max Installment Amount</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{numberWithCommas(maxInstAmt)}</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4>UTR No.</h4>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
						<h4 className='customer-title'>{utrNo}</h4>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default EPay;
