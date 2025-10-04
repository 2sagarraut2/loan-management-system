import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Table } from 'antd';
import BackButton from '../BackButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { limitHistory, limitHistoryTableData } from '../../api';
import { convertDate } from '../../utils';

const LimitPage = (props) => {
	const isWebDevice = useMediaQuery('(min-width: 650px)');

	const [data, setData] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { agreementId } = useParams();

	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());

	useEffect(() => {
		setLoading(true);
		limitHistory(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
				}
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				console.log(errorResponseMessage);
				setErrorMsg(`${errorResponseMessage}`);
				setLoading(false);
			});

		// eslint-disable-next-line
	}, []);

	const getTableData = () => {
		const params = {
			fromDate: convertDate(fromDate),
			toDate: convertDate(toDate),
			agreementId: agreementId,
			pageNo: pageNo - 1,
			pageSize: 10
		};

		setLoading(true);
		limitHistoryTableData(params)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setData(data.tranList);
					setTotal(data.totalRows);
				}
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				console.log(errorResponseMessage);
				setErrorMsg(`${errorResponseMessage}`);
				setLoading(false);
			});
	};

	// columns for table
	const webCols = [
		{
			title: 'Transaction ID',
			dataIndex: 'customerId',
			align: 'center'
		},
		{
			title: 'Transaction Date',
			dataIndex: 'cust_name',
			align: 'center',
			render: (value, row, index) => {
				const firstName = row.firstName;
				const lastName = row.lastName;
				return (
					<span>
						{firstName} {lastName}
					</span>
				);
			}
		},
		{
			title: 'Transaction',
			dataIndex: 'mobile',
			align: 'center'
		},
		{
			title: 'Withdrawal',
			dataIndex: 'custCategory',
			align: 'center'
		},
		{
			title: 'Deposit',
			dataIndex: 'custCategory',
			align: 'center'
		},
		{
			title: 'Limit Utilized',
			dataIndex: 'custCategory',
			align: 'center'
		},
		{
			title: 'Limit Available',
			dataIndex: 'custCategory',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Customer Details',
			dataIndex: 'customerId',
			align: 'left',
			render: (value, row, index) => {
				const id = row.customerId;
				const mid = row.mastAgrId;
				const firstName = row.firstName;
				const lastName = row.lastName;
				const mobile = row.mobile;
				const type = row.custCategory;

				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Transaction ID</h5>
								<h5>{id}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Transaction Date</h5>
								<h5>
									{firstName} {lastName}
								</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Transaction</h5>
								<h5>{mobile}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Withdrawal</h5>
								<h5>{type}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Deposit</h5>
								<h5>{mobile}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Limit Utilized</h5>
								<h5>{type}</h5>
							</span>
						</div>
						<div className='last-label-center'>
							<span>
								<h5 className='small-table-label'>Limit Available</h5>
								{/* <h5>{creditAmount}</h5> */}
							</span>
						</div>
					</div>
				);
			}
		}
	];

	const handleOnPageChange = (index) => {
		setPageNo(index);
	};

	const handleFromDateChange = (e) => {
		setFromDate(e);
	};

	const handleToDateChange = (e) => {
		setToDate(e);
	};

	const handleOnSearch = () => {
		getTableData();
	};

	const handleOnReset = () => {
		setData([]);
		setFromDate(new Date());
		setToDate(new Date());
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
					<Typography variant='h6'>Limit History Details</Typography>
					<BackButton
						path='/limit-history'
						size={isWebDevice ? 'medium' : 'small'}
						text='Limit History'
					/>
				</div>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Customer ID</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						{/* <h4 className='customer-title'>{userId}</h4> */}
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Master Agreement ID</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						{/* <h4 className='customer-title'>{mId}</h4> */}
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Interest Accural</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						{/* <h4 className='customer-title'>{mId}</h4> */}
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Sanctioned Limit</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						{/* <h4 className='customer-title'>{userId}</h4> */}
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Utilized Limit</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						{/* <h4 className='customer-title'>{mId}</h4> */}
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Available Limit</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						{/* <h4 className='customer-title'>{mId}</h4> */}
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Rate of Interest</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 className='customer-title'>userId</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Tenor In Months</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 className='customer-title'>mId</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>Dropline Frequency</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
						{/* <h4 className='customer-title'>{mId}</h4> */}
					</Grid>

					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>From Date</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
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
					<Grid item xs={12} sm={3} md={2} lg={2}>
						<h4 style={{ marginRight: '10%' }}>To Date</h4>
					</Grid>
					<Grid item xs={12} sm={3} md={2} lg={2}>
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

					<Grid
						item
						xs={0}
						sm={9}
						md={9}
						lg={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'end'
						}}></Grid>
					<Grid
						item
						xs={12}
						sm={3}
						md={3}
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
							onClick={handleOnSearch}
							style={{ marginLeft: 5 }}
							disabled={!Boolean(fromDate && toDate)}>
							SEARCH
						</Button>
						<Button
							variant='contained'
							className='search-buttons'
							onClick={handleOnReset}
							style={{ marginLeft: 5 }}>
							RESET
						</Button>
					</Grid>
				</Grid>
			</div>
			<div className='table-wrapper'>
				<Table
					rowKey='customerId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={{
						size: 'small',
						showSizeChanger: false,
						total: total,
						current: pageNo,
						onChange: handleOnPageChange,
						defaultPageSize: 10
					}}
					scroll={{ y: 310 }}
				/>
			</div>
		</div>
	);
};

export default LimitPage;
