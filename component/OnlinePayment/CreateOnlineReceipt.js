import React, { useState } from 'react';
import {
	Button,
	Typography,
	Grid,
	TextField,
	FormControl,
	Select,
	Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import BackButton from '../BackButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useParams } from 'react-router-dom';
import { convertDate } from '../../utils';
import { onlinePayment } from '../../api';

const CreateOnlineReceipt = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 650px)');
	const { userId } = useParams();
	const { mId } = useParams();

	// form hooks
	const [receiptAmount, setReceiptAmount] = useState('');
	const [date, setDate] = useState(new Date());
	const [payOption, setPayOption] = useState('alldues');
	const [referenceNo, setReferenceNo] = useState('');
	const [agency, setAgency] = useState('agency1');
	const [collected, setCollected] = useState('collector1');
	// const [apportion, setApportion] = useState(false);
	const [receiptDate, setReceiptDate] = useState(new Date());
	const [utrNo, setUTRNo] = useState('');
	const [instType, setInstType] = useState('neft');
	// const [instAmount, setInstAmount] = useState('');
	const [ifscCode, setIfscCode] = useState('');
	const [bankName, setBankName] = useState('');
	// const [accType, setAccType] = useState('savings');
	const [branchName, setBranchName] = useState('');
	// const [depositBank, setDepositBank] = useState('');
	// const [accNo, setAccNo] = useState('');

	// search options array
	const paymentOptions = [
		{
			key: 1,
			name: 'ALLDUES',
			type: 'alldues'
		},
		{
			key: 2,
			name: 'INSTALLMENT',
			type: 'installment'
		},
		{
			key: 3,
			name: 'CHARGES',
			type: 'charges'
		},
		{
			key: 4,
			name: 'PREPAYMNT',
			type: 'prepayment'
		},
		{
			key: 5,
			name: 'FORECLOSURE',
			type: 'foreclosure'
		}
	];

	// select values change
	const handleOnSelectChange = (e) => {
		setPayOption(e.target.value);
	};

	// agency options array
	const agencyOptions = [
		{
			key: 1,
			name: 'Agency 1',
			type: 'agency1'
		},
		{
			key: 2,
			name: 'Agency 2',
			type: 'agency 2'
		}
	];

	// collection options
	const collectionOption = [
		{
			key: 1,
			name: 'Collector 1',
			type: 'collector1'
		},
		{
			key: 2,
			name: 'Collector 2',
			type: 'collector2'
		}
	];

	const handleAgencySelectChange = (e) => {
		setAgency(e.target.value);
	};

	const handleCollectSelectChange = (e) => {
		setCollected(e.target.value);
	};

	// const handleChange = (event) => {
	// 	setApportion(event.target.checked);
	// };

	const handleFromDateChange = (e) => {
		setDate(e);
	};

	// location options
	const instrumentType = [
		{
			key: 1,
			name: 'NEFT',
			type: 'neft'
		},
		{
			key: 2,
			name: 'RTGS',
			type: 'rtgs'
		}
	];

	// // account options
	// const accountOptions = [
	// 	{
	// 		key: 1,
	// 		name: 'Savings',
	// 		type: 'savings'
	// 	},
	// 	{
	// 		key: 2,
	// 		name: 'Current',
	// 		type: 'current'
	// 	}
	// ];

	const handleInstrumentChange = (e) => {
		setInstType(e.target.value);
	};

	const handleReceiptDateChange = (e) => {
		setReceiptDate(e);
	};

	const handleUTRChange = (e) => {
		setUTRNo(e.target.value);
	};

	// const handleInstAmtChange = (e) => {
	// 	const amt = e.target.value;

	// 	setReceiptAmount(amt);
	// };

	const handleIfscChange = (e) => {
		const code = e.target.value;

		setIfscCode(code);
	};

	const handleBankChange = (e) => {
		const bank = e.target.value;

		setBankName(bank);
	};

	const handleBranchChange = (e) => {
		const branch = e.target.value;

		setBranchName(branch);
	};

	// const handleAccountTypeChange = (e) => {
	// 	const accType = e.target.value;

	// 	setAccType(e.target.value);
	// };

	// const handleAccChange = (e) => {
	// 	const acc = e.target.value;

	// 	setAccNo(acc);
	// };

	// const handleDepositChange = (e) => {
	// 	const deposit = e.target.value;

	// 	setDepositBank(deposit);
	// };

	const saveReceiptDetails = (params) => {
		setLoading(true);

		onlinePayment(params)
			.then((res) => {
				if (res.status === 200) {
					setLoading(false);
					window.location.href = `/online-payment`;
					setSuccessMsg('Online Payment Receipt generated successfully!');
				}
			})
			.catch((error) => {
				setLoading(false);
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
			});
	};

	const handleOnSave = () => {
		console.log(receiptAmount, date, payOption, referenceNo, agency, collected);

		const params = {
			'bankBranchCode': branchName,
			'bankCode': bankName,
			'collectedBy': collected,
			'collectionAgency': agency,
			'depositRefNo': referenceNo,
			'dreAllocation': [
				{
					'allocatedAmount': 1111,
					'chargeBookTranId': 0,
					'installmentNo': 0,
					'loanId': '',
					'tranCategory': '',
					'tranHead': ''
				}
			],
			'flowType': 'NF',
			'ifscCode': ifscCode,
			'instrumentAmount': receiptAmount,
			'instrumentDate': convertDate(date),
			'masterAgreementId': mId,
			'paymentFor': payOption,
			'paymentMode': 'DRE',
			'paymentType': 'CA',
			'provisionalReceiptFlag': '12345',
			'reason': 'CP',
			'remark': 'CP',
			'requestDate': convertDate(date),
			'requestStatus': 'APR',
			'userId': 'DMG',
			'utrNo': 'UTR0123123'
		};

		saveReceiptDetails(params);
	};

	const handleOnCancel = () => {
		window.location.href = `/cash-receipt`;
	};

	const handleRefChange = (e) => {
		const referenceNo = e.target.value;

		setReferenceNo(referenceNo);
	};

	const handleReceiptChange = (e) => {
		const receiptAmount = e.target.value;

		setReceiptAmount(receiptAmount);
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
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>Online Payment Receipt</Typography>
					<BackButton
						path='/online-payment'
						size={isWebDevice ? 'medium' : 'small'}
						text='Online Payment Receipt'
					/>
				</div>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Customer ID</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 className='customer-title'>{userId}</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Master Agreement</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 className='customer-title'>{mId}</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Receipt Amount</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='Receipt Amount'
							variant='outlined'
							name='custid'
							value={receiptAmount}
							onChange={handleReceiptChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Transaction Date</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								clearable
								value={date}
								onChange={(date) => handleFromDateChange(date)}
								format='dd/MM/yyyy'
								allowKeyboardControl={false}
								invalidDateMessage={'Invalid Date Format'}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Payment For</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<FormControl style={{ margin: 7 }}>
							<Select native value={payOption} onChange={handleOnSelectChange}>
								{paymentOptions.map((item) => (
									<option key={item.key} value={item.type}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Reference No.</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='Reference No.'
							variant='outlined'
							name='custid'
							value={referenceNo}
							onChange={handleRefChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Collection Agency</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<FormControl style={{ margin: 7 }}>
							<Select native value={agency} onChange={handleAgencySelectChange}>
								{agencyOptions.map((item) => (
									<option key={item.key} value={item.type}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Collected By</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<FormControl style={{ margin: 7 }}>
							<Select
								native
								value={collected}
								onChange={handleCollectSelectChange}>
								{collectionOption.map((item) => (
									<option key={item.key} value={item.type}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid>
					{/* <Grid item xs={12} sm={6} md={3} lg={3}>
						<FormControlLabel
							control={
								<Checkbox
									checked={apportion}
									onChange={handleChange}
									name='checkedB'
									color='primary'
								/>
							}
							label='Manual Apportion?'
						/>
					</Grid> */}

					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Receipt Date</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								clearable
								value={receiptDate}
								onChange={(date) => handleReceiptDateChange(date)}
								format='dd/MM/yyyy'
								allowKeyboardControl={false}
								invalidDateMessage={'Invalid Date Format'}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>UTR No.</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='UTR No.'
							variant='outlined'
							name='custid'
							value={utrNo}
							onChange={handleUTRChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Instrument Type</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<FormControl style={{ margin: 7 }}>
							<Select native value={instType} onChange={handleInstrumentChange}>
								{instrumentType.map((item) => (
									<option key={item.key} value={item.type}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid>
					{/* <Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Expected Date</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								clearable
								value={receiptDate}
								// onChange={(date) => handleReceiptDateChange(date)}
								format='dd/MM/yyyy'
								allowKeyboardControl={false}
								invalidDateMessage={'Invalid Date Format'}
								disabled={true}
							/>
						</MuiPickersUtilsProvider>
					</Grid> */}
					{/* <Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Instrument Amount</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='Instrument Amount'
							disabled={true}
							variant='outlined'
							name='instAmount'
							value={instAmount}
							onChange={handleInstAmtChange}
						/>
					</Grid> */}
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>IFSC Code</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='IFSC Code'
							variant='outlined'
							name='ifsccode'
							value={ifscCode}
							onChange={handleIfscChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Bank Name</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='Bank Name'
							variant='outlined'
							name='bankname'
							value={bankName}
							onChange={handleBankChange}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Account Type</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<FormControl style={{ margin: 7 }}>
							<Select native value={accType} onChange={handleAccountTypeChange}>
								{accountOptions.map((item) => (
									<option key={item.key} value={item.type}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid> */}
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Branch Name</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='Branch Name'
							variant='outlined'
							name='branchname'
							value={branchName}
							onChange={handleBranchChange}
						/>
					</Grid>
					{/* <Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Account No.</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='Account No.'
							variant='outlined'
							name='accountno'
							value={accNo}
							onChange={handleAccChange}
						/>
					</Grid> */}
					{/* <Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Deposit Bank</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<TextField
							className='cust-search-fields'
							size='small'
							label='Deposit Bank'
							variant='outlined'
							name='deposit Bank'
							value={depositBank}
							onChange={handleDepositChange}
						/>
					</Grid> */}

					<Grid
						item
						xs={12}
						sm={4}
						md={6}
						lg={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'end'
						}}></Grid>
					<Grid
						item
						xs={12}
						sm={8}
						md={6}
						lg={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'end'
						}}>
						<Button
							variant='contained'
							color='primary'
							className='search-buttons'
							onClick={handleOnSave}
							style={{ marginLeft: 5 }}
							disabled={
								!Boolean(
									receiptAmount &&
										referenceNo &&
										date &&
										paymentOptions &&
										agency &&
										collected
								)
							}>
							SAVE
						</Button>
						<Button
							variant='contained'
							className='search-buttons'
							onClick={handleOnCancel}
							style={{ marginLeft: 5 }}>
							CLOSE
						</Button>
					</Grid>
				</Grid>
			</div>
			{/* <ApportionTable /> */}
		</div>
	);
};

export default CreateOnlineReceipt;
