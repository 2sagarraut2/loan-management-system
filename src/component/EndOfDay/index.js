import React, { useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import BackButton from '../BackButton';
import { Table } from 'antd';
import { convertDate } from '../../utils';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const EndOfDay = (props) => {
	const { data, getEndOfDayStatus, setData, total, setTotal } = props;
	const isWebDevice = useMediaQuery('(min-width: 650px)');

	// form hooks
	const [fromDate, setFromDate] = useState(new Date());
	const [pageNo, setPageNo] = useState(1);

	// columns for table
	const webCols = [
		{
			title: 'Customer Id',
			dataIndex: 'customerId',
			align: 'center'
		},
		{
			title: 'Process Name',
			dataIndex: 'processName',
			align: 'center'
		},
		{
			title: 'Process Status',
			dataIndex: 'processStatus',
			align: 'center'
		},
		{
			title: 'Business Date',
			dataIndex: 'businessDate',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'End of Day Status',
			dataIndex: 'eodSrNo',
			align: 'left',
			render: (value, row, index) => {
				const id = row.customerId;
				const processName = row.processName;
				const processStatus = row.processStatus;
				const businessDate = row.businessDate;
				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Customer Id</h5>
								<h5>{id}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Process Name</h5>
								<h5>{processName}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Process Status</h5>
								<h5>{processStatus}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Business Date</h5>
								<h5>{businessDate}</h5>
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

	const handleOnSearch = () => {
		setPageNo(1);
		const fromDateParam = convertDate(fromDate);
		const params = {
			fromDateParam: fromDateParam,
			pageNo: pageNo - 1,
			pageSize: 10
		};
		getEndOfDayStatus(params);
	};

	const handleOnReset = () => {
		setFromDate(new Date());
		setData([]);
		setPageNo(1);
		setTotal(0);
	};

	const handleOnPageChange = (index) => {
		setPageNo(index);

		const fromDateParam = convertDate(fromDate);
		const params = {
			fromDateParam: fromDateParam,
			pageNo: index - 1,
			pageSize: 10
		};

		getEndOfDayStatus(params);
	};

	return (
		<div>
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>EOD Status</Typography>
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
							alignItems: 'center',
							justifyContent: 'flex-start'
						}}>
						<Button
							variant='contained'
							color='primary'
							className='search-buttons'
							onClick={handleOnSearch}
							disabled={!Boolean(fromDate)}
							style={{ marginLeft: 5 }}>
							APPLY FILTER
						</Button>
						<Button
							variant='contained'
							className='search-buttons'
							onClick={handleOnReset}
							disabled={!Boolean(fromDate)}
							style={{ marginLeft: 5 }}>
							CLEAR FILTER
						</Button>
					</Grid>
				</Grid>
			</div>
			<div className='table-wrapper'>
				<Table
					rowKey='eodSrNo'
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
					scroll={{ y: 280 }}
				/>
			</div>
		</div>
	);
};

export default EndOfDay;
