import React, { useState, useEffect } from 'react';
import {
	Grid,
	Button,
	Typography,
	FormControl,
	Select,
	Link,
	Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
// import { makeStyles } from '@material-ui/core/styles';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import BackButton from '../BackButton';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { searchBatchDetails, downloadBatch, getBusinessDate } from '../../api';
import { convertDate } from '../../utils';
// import { downloadFile } from '../../utils';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		'& > *': {
// 			margin: theme.spacing(1)
// 		}
// 	},
// 	input: {
// 		display: 'none'
// 	}
// }));

const Batches = (props) => {
	const isWebDevice = useMediaQuery('(min-width: 700px)');
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	// const classes = useStyles();

	// form hooks
	const [data, setData] = useState([]);
	const [instrumentType, setInstrumentType] = useState('ECS');
	const [batchStatus, setBatchStatus] = useState('O');
	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [buDate, setBuDate] = useState('');

	useEffect(() => {
		// to get latest business date from api
		getDate();
	}, []);

	const searchBatches = (instrumentType, batchStatus, toDate, fromDate) => {
		// const fromDateParam = fromDate.toJSON().slice(0, 10).replace(/-/g, '-');
		const fromDateParam = convertDate(fromDate);
		const toDateParam = convertDate(toDate);
		const params = { instrumentType, batchStatus, toDateParam, fromDateParam };
		setLoading(true);

		searchBatchDetails(params)
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
				setLoading(false);
				setData([]);
			});
	};

	// instrument type options array
	const instrumentTypesOptions = [
		{
			key: 1,
			name: 'ECS',
			type: 'ecs'
		},
		{
			key: 2,
			name: 'ACH',
			type: 'ach'
		},
		{
			key: 3,
			name: 'NACH',
			type: 'nach'
		},
		{
			key: 4,
			name: 'ENACH',
			type: 'enach'
		}
	];

	// batch status options array
	const batchStatusOptions = [
		{
			key: 1,
			name: 'Open',
			type: 'O'
		},
		{
			key: 2,
			name: 'Closed',
			type: 'C'
		},
		{
			key: 3,
			name: 'Download',
			type: 'D'
		}
	];

	// columns for table
	const webCols = [
		{
			title: 'Batch No.',
			dataIndex: 'batchId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.batchId;
				return (
					<span>
						<Link
							onClick={() => {
								window.location.href = `/batch-control/${id}`;
							}}>
							{id}
						</Link>
					</span>
				);
			}
		},
		{
			title: 'Instrument Type',
			dataIndex: 'instrumentType',
			align: 'center',
			render: (value, row, index) => {
				const type = row.instrumentType;
				return <span>{type}</span>;
			}
		},
		{
			title: 'Batch Status',
			dataIndex: 'batchStatus',
			align: 'center'
		},
		{
			title: 'Total Instruments',
			dataIndex: 'totalInstruments',
			align: 'center'
		},
		{
			title: 'Batch Date',
			dataIndex: 'dtBatchDate',
			align: 'center'
		},
		{
			title: 'Deposit Bank',
			dataIndex: 'depositBankName',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Batch Details',
			dataIndex: 'mastAgrId',
			align: 'left',
			render: (value, row, index) => {
				const id = row.batchId;
				const type = row.instrumentType;
				const status = row.batchStatus;
				const totalInst = row.totalInstruments;
				const date = row.dtBatchDate;
				const bank = row.depositBankName;
				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Batch No.</h5>
								<h5>
									<Link>{id}</Link>
								</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Instrument Type</h5>
								<h5>{type}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Batch Status</h5>
								<h5>{status}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Total Instrument</h5>
								<h5>{totalInst}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Batch Date</h5>
								<h5>{date}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Deposit Bank</h5>
								<h5>{bank}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	const handleOnInstrumentChange = (e) => {
		setInstrumentType(e.target.value);
	};

	const handleOnBatchChange = (e) => {
		setBatchStatus(e.target.value);
	};

	const handleFromDateChange = (e) => {
		setFromDate(e);
	};

	const handleToDateChange = (e) => {
		setToDate(e);
	};

	const handleOnSearch = () => {
		searchBatches(instrumentType, batchStatus, toDate, fromDate);
	};

	const handleOnReset = () => {
		setInstrumentType('ecs');
		setBatchStatus('open');
		setToDate(new Date());
		setFromDate(new Date());
		setData([]);
	};

	// for table row selection change
	const onSelectChange = (selectedRowKeys, selectedRows) => {
		setSelectedRowKeys(selectedRowKeys);
		setSelectedRows(selectedRows);
	};

	// table row selection function
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	};

	const getDate = () => {
		getBusinessDate()
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setBuDate(data);
				}
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
				setBuDate('');
			});
	};

	// function for download
	const handleOnDownload = () => {
		const dataIds = selectedRows.map((item) => {
			return item.batchId;
		});

		const params = {
			arrBatchId: dataIds,
			businessDate: convertDate(buDate)
		};

		setLoading(true);

		downloadBatch(params)
			.then((res) => {
				if (res.status === 200) {
					var blob = new Blob([res.data], { type: 'application/zip' });
					var link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					link.download = 'download.zip';
					link.click();
				}
				setLoading(false);
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage = 'Error occured while downloading file' }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
				setLoading(false);
			});
	};

	// file upload function
	// const onFileUploadChange = (e) => {
	// 	const files = e.target.files;
	// 	console.warn(files[0].name);

	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(files[0]);

	// 	reader.onload = (e) => {
	// 		const formData = { file: e.target.result };
	// 		// console.log(formData);
	// 		// send form data to api

	// 		const params = {
	// 			batchId: batchId,
	// 			fileData: formData,
	// 			fileName: files[0].name,
	// 			businessDate: '2020-02-01'
	// 		};

	// 		console.log(params)

	// 		uploadBatch(params)
	// 			.then((res) => {
	// 				if (res.status === 200) {
	// 					const { data } = res;
	// 				}
	// 				setLoading(false);
	// 			})
	// 			.catch((error) => {
	// 				const {
	// 					response: {
	// 						data: { errorResponseMessage }
	// 					}
	// 				} = error;
	// 				setErrorMsg(`${errorResponseMessage}`);
	// 				setLoading(false);
	// 			});
	// 	};
	// };

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
					<Typography variant='h6'>EMI Presentation Batches</Typography>
					<BackButton
						path='/dashboard'
						size={isWebDevice ? 'medium' : 'small'}
						text='Dashboard'
					/>
				</div>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						style={{
							display: 'flex',
							alignItems: 'baseline',
							justifyContent: 'flex-start'
						}}>
						<h4 style={{ marginRight: '10%' }}>Instrument Type</h4>
						<FormControl style={{ margin: 7, width: '50%' }}>
							<Select
								native
								fullWidth
								value={instrumentType}
								onChange={handleOnInstrumentChange}>
								{instrumentTypesOptions.map((item) => (
									<option key={item.key} value={item.type}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						style={{
							display: 'flex',
							alignItems: 'baseline',
							justifyContent: 'flex-start'
						}}>
						<h4 style={{ marginRight: '10%' }}>Batch Status</h4>
						<FormControl style={{ margin: 7, width: '50%' }}>
							<Select
								native
								fullWidth
								value={batchStatus}
								onChange={handleOnBatchChange}>
								{batchStatusOptions.map((item) => (
									<option key={item.key} value={item.type}>
										{item.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						style={{
							display: 'flex',
							alignItems: 'baseline',
							justifyContent: 'flex-start'
						}}>
						<h4 style={{ marginRight: '10%' }}>From Date</h4>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								clearable
								value={fromDate}
								onChange={(date) => handleFromDateChange(date)}
								format='dd/MM/yyyy'
								allowKeyboardControl={false}
								invalidDateMessage={'Invalid Date Format'}
								style={{ width: '60%' }}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						style={{
							display: 'flex',
							alignItems: 'baseline',
							justifyContent: 'flex-start'
						}}>
						<h4 style={{ marginRight: '10%' }}>To Date</h4>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								clearable
								value={toDate}
								onChange={(date) => handleToDateChange(date)}
								format='dd/MM/yyyy'
								allowKeyboardControl={false}
								invalidDateMessage={'Invalid Date Format'}
								style={{ width: '60%' }}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
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
							onClick={handleOnSearch}
							style={{ marginLeft: 5 }}>
							APPLY FILTER
						</Button>
						<Button
							variant='contained'
							className='search-buttons'
							onClick={handleOnReset}
							style={{ marginLeft: 5 }}>
							CLEAR FILTER
						</Button>
					</Grid>
				</Grid>
			</div>
			<div className='table-wrapper'>
				<Table
					rowKey='batchId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					rowSelection={rowSelection}
					pagination={false}
					scroll={{ y: 180 }}
				/>
				<div className='table-footer-batch'>
					<Button
						variant='contained'
						color='primary'
						onClick={handleOnDownload}
						disabled={!selectedRowKeys.length}
						style={{ marginLeft: 5 }}>
						Batch Downoad
					</Button>
					{/* <FormControl>
						<input
							className={classes.input}
							id='contained-button-file'
							multiple
							type='file'
							accept='.csv'
							onChange={onFileUploadChange}
						/>
						<label htmlFor='contained-button-file'>
							<Button
								variant='contained'
								color='primary'
								component='span'
								startIcon={<CloudUploadIcon />}>
								Batch Upload
							</Button>
						</label>
					</FormControl> */}
				</div>
			</div>
		</div>
	);
};

export default Batches;
