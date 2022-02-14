import React, { useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import BackButton from '../BackButton';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Dues = (props) => {
	const { data, getFutureDues, setData } = props;
	const isWebDevice = useMediaQuery('(min-width: 650px)');

	// form hooks
	const [fromDate, setFromDate] = useState(new Date());
	const [toDate, setToDate] = useState(new Date());

	// columns for table
	const webCols = [
		{
			title: 'Master Agr. ID',
			dataIndex: 'mastAgrId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				return <span>{id}</span>;
			}
		},
		{
			title: 'Loan ID',
			dataIndex: 'loanId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.loanId;
				return <span>{id}</span>;
			}
		},
		{
			title: 'Due Date',
			dataIndex: 'dtDueDate',
			align: 'center'
		},
		{
			title: 'Due Category',
			dataIndex: 'dueCategory',
			align: 'center'
		},
		{
			title: 'Due Head',
			dataIndex: 'dueHead',
			align: 'center'
		},
		{
			title: 'Installment No.',
			dataIndex: 'installmentNo',
			align: 'center'
		},
		{
			title: 'Due Amount',
			dataIndex: 'dueAmount',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Future Due Details',
			dataIndex: 'mastAgrId',
			align: 'left',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				const loanId = row.loanId;
				const date = row.dtDueDate;
				const category = row.dueCategory;
				const head = row.dueHead;
				const no = row.installmentNo;
				const amount = row.dueAmount;
				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Master Agr. ID</h5>
								<h5>{id}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Loan ID</h5>
								<h5>{loanId}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Due Date</h5>
								<h5>{date}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Due Category</h5>
								<h5>{category}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Due Head</h5>
								<h5>{head}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Installment No.</h5>
								<h5>{no}</h5>
							</span>
						</div>
						<div className='last-label-center'>
							<span>
								<h5 className='small-table-label'>Due Amount</h5>
								<h5>{amount}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	const handleFromDateChange = (e) => {
		setFromDate(e);
	};

	const handleToDateChange = (e) => {
		setToDate(e);
	};

	const handleOnSearch = () => {
		console.log(toDate, fromDate);
		getFutureDues(fromDate, toDate);
	};

	const handleOnReset = () => {
		setToDate(new Date());
		setFromDate(new Date());
		setData([]);
	};

	return (
		<div>
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>Future Dues</Typography>
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
						md={4}
						lg={4}
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
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						lg={4}
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
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						lg={4}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start'
						}}>
						<Button
							variant='contained'
							color='primary'
							className='search-buttons'
							onClick={handleOnSearch}
							disabled={!Boolean(fromDate & toDate)}
							style={{ marginLeft: 5 }}>
							APPLY FILTER
						</Button>
						<Button
							variant='contained'
							className='search-buttons'
							onClick={handleOnReset}
							disabled={!Boolean(fromDate & toDate)}
							style={{ marginLeft: 5 }}>
							CLEAR FILTER
						</Button>
					</Grid>
				</Grid>
			</div>
			<div className='table-wrapper'>
				<Table
					rowKey='dueDtlId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={false}
					scroll={{ y: 260 }}
				/>
			</div>
		</div>
	);
};

export default Dues;
