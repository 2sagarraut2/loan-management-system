import React, { useState } from 'react';
import {
	Button,
	Typography,
	Grid,
	TextField,
	FormControl,
	Select
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import BackButton from '../BackButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useParams } from 'react-router-dom';
import { convertDate } from '../../utils';
import { chequeReceipt } from '../../api';

const CreateChequeReceipt = () => {
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

	const handleFromDateChange = (e) => {
		setDate(e);
	};

	const handleOnSave = () => {
		console.log(receiptAmount, date, payOption, referenceNo, agency, collected);

		const params = {
			'collectedBy': collected,
			'collectionAgency': agency,
			'depositRefNo': referenceNo,
			'dreAllocation': [
				{
					'allocatedAmount': 5000,
					'chargeBookTranId': '',
					'installmentNo': '',
					'loanId': '',
					'tranCategory': '',
					'tranHead': ''
				}
			],
			'flowType': 'NF',
			'instrumentAmount': 5000,
			'instrumentDate': '07-06-2020',
			'masterAgreementId': mId,
			'paymentFor': payOption,
			'paymentMode': 'DRE',
			'paymentType': 'CA',
			'provisionalReceiptFlag': 'N',
			'reason': '',
			'remark': '',
			'requestDate': convertDate(date),
			'requestStatus': 'APR',
			'userId': 'DMG'
		};

		saveReceiptDetails(params);
	};

	const saveReceiptDetails = (params) => {
		setLoading(true);

		chequeReceipt(params)
			.then((res) => {
				if (res.status === 200) {
					setSuccessMsg('Cash Receipt generated successfully!');
					setLoading(false);
					window.location.href = `/cash-receipt`;
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

	const handleOnCancel = () => {
		window.location.href = `/cheque-receipt`;
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
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>Cheque Receipt</Typography>
					<BackButton
						path='/cheque-receipt'
						size={isWebDevice ? 'medium' : 'small'}
						text='Cheque Receipt'
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
					<Grid item xs={12} sm={6} md={3} lg={3} className='border-down'>
						<h4 style={{ marginRight: '10%' }}>Collection Agency</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3} className='border-down'>
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
					<Grid item xs={12} sm={6} md={3} lg={3} className='border-down'>
						<h4 style={{ marginRight: '10%' }}>Collected By</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3} className='border-down'>
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
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Instrument Location</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Expected Date</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Instrument Amount</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>IFSC Code</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Bank Name</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Account Type</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Branch Name</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Account No.</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}>
						<h4 style={{ marginRight: '10%' }}>Deposit Bank</h4>
					</Grid>
					<Grid item xs={12} sm={6} md={3} lg={3}></Grid>

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
		</div>
	);
};

export default CreateChequeReceipt;
