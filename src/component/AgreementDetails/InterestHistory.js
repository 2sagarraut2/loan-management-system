import React, { useState, useEffect } from 'react';
import {
	useMediaQuery,
	Grid,
	Snackbar,
	Select,
	FormControl
} from '@material-ui/core';
import { Table } from 'antd';
import { Alert } from '@material-ui/lab';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementLoanList, interstAccuralHistory } from '../../api';

const InterestHistory = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 820px)');

	const { agreementId } = useParams();

	// form hooks
	const [data, setData] = useState([]);
	const [loanID, setLoanID] = useState([]);
	const [selectedLoanID, setSelectedLoanID] = useState('');
	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());

	useEffect(() => {
		// setLoading(true);
		agreementLoanList(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setLoanID(data);
					setSelectedLoanID(data[0].loanId);
					interestAccuralHistory(agreementId, data[0].loanId, fromDate, toDate);
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

	const interestAccuralHistory = (agreementId, loanID, fromDate, toDate) => {
		const fromDateParam = `${fromDate.getFullYear()}-${
			fromDate.getMonth() + 1
		}-${fromDate.getDate()}`;
		const toDateParam = `${toDate.getFullYear()}-${
			toDate.getMonth() + 1
		}-${toDate.getDate()}`;
		console.log(fromDateParam, toDateParam);
		setLoading(true);
		interstAccuralHistory(agreementId, loanID, fromDateParam, toDateParam)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setData(data);
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

	// columns for table
	const webCols = [
		{
			title: 'Tran. Date',
			dataIndex: 'dtTranDate',
			align: 'center'
		},
		{
			title: 'Transaction Type',
			dataIndex: 'tranType',
			align: 'center'
		},
		{
			title: 'Transaction Remark',
			dataIndex: 'remark',
			align: 'center'
		},
		{
			title: 'Debit Amount',
			dataIndex: 'debitAmount',
			align: 'center'
		},
		{
			title: 'Credit Amount',
			dataIndex: 'creditAmount',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Interest Accural History',
			align: 'center',
			render: (value, row, index) => {
				const dtTranDate = row.dtTranDate;
				const tranType = row.tranType;
				const remark = row.remark;
				const debitAmount = row.debitAmount;
				const creditAmount = row.creditAmount;
				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Tran. Date</h5>
								<h5>{dtTranDate}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Transaction Type</h5>
								<h5>{tranType}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Transaction Remark</h5>
								<h5>{remark}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Debit Amount</h5>
								<h5>{debitAmount}</h5>
							</span>
						</div>
						<div className='last-label-center'>
							<span>
								<h5 className='small-table-label'>Credit Amount</h5>
								<h5>{creditAmount}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	const handleOnSelectChange = (e) => {
		setSelectedLoanID(selectedLoanID);
		interestAccuralHistory(agreementId, e.target.value, fromDate, toDate);
	};

	const handleFromDateChange = (e) => {
		setFromDate(e);
		if (fromDate && toDate) {
			interestAccuralHistory(agreementId, selectedLoanID, e, toDate);
		}
	};

	const handleToDateChange = (e) => {
		setToDate(e);
		if (fromDate && toDate) {
			interestAccuralHistory(agreementId, selectedLoanID, fromDate, e);
		}
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
					<h4 style={{ wordBreak: 'break-all' }}>Consolidated</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>Pune001</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Loan ID</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<FormControl style={{ margin: 7 }}>
						<Select
							native
							value={selectedLoanID}
							onChange={handleOnSelectChange}>
							{loanID.map((item) => (
								<option key={item.loanId} value={item.loanId}>
									{item.loanId}
								</option>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>From Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							clearable
							value={fromDate}
							onChange={(date) => handleFromDateChange(date)}
							format='dd/MM/yyyy'
							allowKeyboardControl={false}
							invalidDateMessage={'Invalid Date Format'}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>To Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							clearable
							value={toDate}
							onChange={(date) => handleToDateChange(date)}
							format='dd/MM/yyyy'
							allowKeyboardControl={false}
							invalidDateMessage={'Invalid Date Format'}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
			</Grid>

			<div style={{ padding: '1% 20px' }}>
				<div className='table-wrapper'>
					<Table
						rowKey='tranId'
						className='cust-table'
						dataSource={data}
						columns={isWebDevice ? webCols : deviceCols}
						pagination={false}
						scroll={{ y: 300 }}
					/>
				</div>
			</div>
		</div>
	);
};

export default InterestHistory;
