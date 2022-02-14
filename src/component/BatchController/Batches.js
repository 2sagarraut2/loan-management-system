import React, { useState } from 'react';
import {
	Grid,
	Button,
	Typography,
	FormControl,
	Select,
	Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import BackButton from '../BackButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	}
}));

const Batches = (props) => {
	const isWebDevice = useMediaQuery('(min-width: 700px)');

	const classes = useStyles();

	// form hooks
	const [instrumentType, setInstrumentType] = useState('ECS');
	const [batchStatus, setBatchStatus] = useState('OPEN');
	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const data = [
		{
			batchNo: 1,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 2,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 3,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 4,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 5,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 6,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 7,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 8,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		},
		{
			batchNo: 9,
			instrumentType: 'ECS',
			batchStatus: 'Open',
			totalInstrument: 100,
			batchDate: '24/12/2022',
			depositBank: 'SBI'
		}
	];

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
		}
	];

	// batch status options array
	const batchStatusOptions = [
		{
			key: 1,
			name: 'Open',
			type: 'open'
		},
		{
			key: 2,
			name: 'Closed',
			type: 'closed'
		}
	];

	// columns for table
	const webCols = [
		{
			title: 'Batch No.',
			dataIndex: 'batchNo',
			align: 'center',
			render: (value, row, index) => {
				const id = row.batchNo;
				return (
					<span>
						<Link
							onClick={() => {
								window.location.href = `/future-dues/${id}`;
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
			title: 'Total Instrument',
			dataIndex: 'totalInstrument',
			align: 'center'
		},
		{
			title: 'Batch Date',
			dataIndex: 'dueHead',
			align: 'center'
		},
		{
			title: 'Deposit Bank',
			dataIndex: 'depositBank',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Batch Details',
			dataIndex: 'mastAgrId',
			align: 'left',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				const loanId = row.loanId;
				const date = row.dtDueDate;
				const category = row.dueCategory;
				const head = row.dueHead;
				const no = row.installmentNo;
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
								<h5>{loanId}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Batch Status</h5>
								<h5>{date}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Total Instrument</h5>
								<h5>{category}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Batch Date</h5>
								<h5>{head}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Deposit Bank</h5>
								<h5>{no}</h5>
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
		console.log(instrumentType, batchStatus, toDate, fromDate);
	};

	const handleOnReset = () => {
		setInstrumentType('ecs');
		setBatchStatus('open');
		setToDate(new Date());
		setFromDate(new Date());
	};

	const onSelectChange = (selectedRowKeys, selectedRows) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		setSelectedRowKeys(selectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	};

	return (
		<div>
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>Batch Control Center</Typography>
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
							// disabled={!Boolean(instrumentType || batchStatus|| fromDate || toDate)}
							style={{ marginLeft: 5 }}>
							APPLY FILTER
						</Button>
						<Button
							variant='contained'
							className='search-buttons'
							onClick={handleOnReset}
							// disabled={!Boolean(instrumentType || batchStatus || fromDate || toDate)}
							style={{ marginLeft: 5 }}>
							CLEAR FILTER
						</Button>
					</Grid>
				</Grid>
			</div>
			<div className='table-wrapper'>
				<Table
					rowKey='batchNo'
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
						className='search-buttons'
						// onClick={handleOnSearch}
						disabled={!selectedRowKeys.length}
						style={{ marginLeft: 5 }}>
						Batch Downoad
					</Button>
					<FormControl>
						<input
							accept='image/*'
							className={classes.input}
							id='contained-button-file'
							multiple
							type='file'
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
					</FormControl>
					{/* <Button
						variant='contained'
						color='primary'
						className='search-buttons'
						// onClick={handleOnSearch}
						// disabled={!Boolean(fromDate & toDate)}
						style={{ marginLeft: 5 }}>
						Batch Upload
					</Button> */}
				</div>
			</div>
		</div>
	);
};

export default Batches;
